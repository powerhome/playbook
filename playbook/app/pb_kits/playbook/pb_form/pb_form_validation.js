import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from '../utilities/object'

// Kit selectors
const KIT_SELECTOR             = '[class^="pb_"][class*="_kit"]'
const ERROR_MESSAGE_SELECTOR   = '.pb_body_kit_negative'

// Validation selectors
const FORM_SELECTOR            = 'form[data-pb-form-validation="true"]'
const REQUIRED_FIELDS_SELECTOR = 'input[required],textarea[required],select[required]'
const PHONE_NUMBER_VALIDATION_ERROR_SELECTOR = '[data-pb-phone-validation-error="true"]'

const FIELD_EVENTS = [
  'change',
  'valid',
  'invalid',
]
class PbFormValidation extends PbEnhancedElement {
  static get selector() {
    return FORM_SELECTOR
  }

  connect() {
    this.boundFields = new WeakSet()
    this.bindValidationListeners()

    // Debounce rebinding so dynamic kits (ex: Typeahead result rendering)
    // don't cause repeated expensive scans.
    this.debouncedBindValidationListeners = debounce(() => {
      this.bindValidationListeners()
    }, 100)

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.hasNewRequiredFields(mutations)) return
      this.debouncedBindValidationListeners()
    })
    this.mutationObserver.observe(this.element, { childList: true, subtree: true })

    // Add event listener to check for phone number validation errors
    this.element.addEventListener('submit', (event) => {
      // Use setTimeout to ensure React state updates have completed
      setTimeout(() => {
        if (this.hasPhoneNumberValidationErrors()) {
          event.preventDefault()
          return false
        }
      }, 0)
    })
  }

  disconnect() {
    if (this.mutationObserver) this.mutationObserver.disconnect()
  }

  bindValidationListeners() {
    this.formValidationFields.forEach((field) => {
      if (this.boundFields?.has(field)) return

      // Skip phone number inputs - they handle their own validation
      const isPhoneNumberInput = field.closest('.pb_phone_number_input')
      if (isPhoneNumberInput) return

      // Skip TimePicker inputs - they handle their own validation
      const isTimePickerInput = field.closest('.pb_time_picker')
      if (isTimePickerInput) return

      const handler = debounce((event) => {
        this.validateFormField(event)
      }, 250)

      FIELD_EVENTS.forEach((eventName) => {
        field.addEventListener(eventName, handler, false)
      })

      this.boundFields?.add(field)
    })
  }

  validateFormField(event) {
    // Only prevent native browser validation UI for invalid events.
    if (event.type === 'invalid') event.preventDefault()

    const { target } = event
    const kitElement = this.getKitElement(target)

    // Reset any custom validity before we check validity.
    target.setCustomValidity('')

    const isValid = target.validity.valid

    if (isValid) {
      this.clearError(target)
    } else {
      const message = this.getValidationMessage(target, kitElement)
      if (message) target.setCustomValidity(message)
      this.showValidationMessage(target)
    }
  }

  showValidationMessage(target) {
    const { parentElement } = target
    const kitElement = this.getKitElement(target)

    // FIX: Add null check for kitElement
    if (!kitElement) return

    // Check if this is a phone number input
    const isPhoneNumberInput = kitElement.classList.contains('pb_phone_number_input')
    
    // Check if this is a TimePicker input
    const isTimePickerInput = kitElement.classList.contains('pb_time_picker')

    // ensure clean error message state
    this.clearError(target)
    kitElement.classList.add('error')

    // Only add error message if it's NOT a phone number input or TimePicker input
    if (!isPhoneNumberInput && !isTimePickerInput) {
      // set the error message element
      const errorMessageContainer = this.errorMessageContainer
      errorMessageContainer.textContent = target.validationMessage

      // Many kits (including Typeahead) expect the error message to live inside
      // `.text_input_wrapper` for styling and show/hide logic.
      const errorParent = this.getErrorParent(target, kitElement, parentElement)
      errorParent.appendChild(errorMessageContainer)
    }
  }

  clearError(target) {
    const { parentElement } = target
    const kitElement = this.getKitElement(target)
    // Remove error class from kit element
    if (kitElement) kitElement.classList.remove('error')

    const errorParent = this.getErrorParent(target, kitElement, parentElement)
    // Remove error message from the error parent first, then fall back to kit element
    const errorMessageContainer =
      errorParent.querySelector(ERROR_MESSAGE_SELECTOR) ||
      (kitElement || parentElement).querySelector(ERROR_MESSAGE_SELECTOR)
    if (errorMessageContainer) errorMessageContainer.remove()
  }

  getErrorParent(target, kitElement, parentElement) {
    return (
      target.closest('.text_input_wrapper') ||
      kitElement?.querySelector?.('.text_input_wrapper') ||
      kitElement ||
      parentElement
    )
  }

  hasNewRequiredFields(mutations) {
    return mutations.some((mutation) => {
      return Array.from(mutation.addedNodes || []).some((node) => {
        if (!(node instanceof Element)) return false
        if (node.matches && node.matches(REQUIRED_FIELDS_SELECTOR)) return true
        return !!node.querySelector?.(REQUIRED_FIELDS_SELECTOR)
      })
    })
  }

  getKitElement(target) {
    return target.closest(KIT_SELECTOR) || target.parentElement?.closest(KIT_SELECTOR)
  }

  getValidationMessage(target, kitElement) {
    // Support both styles used across kits:
    // - Rails input kits: data-message (dataset.message)
    // - Select/React kits: data-validation-message (dataset.validationMessage)
    return target.dataset?.message || target.dataset?.validationMessage || kitElement?.dataset?.validationMessage || ''
  }

  // Check if there are phone number input errors
  hasPhoneNumberValidationErrors() {
    const phoneNumberErrors = this.element.querySelectorAll(PHONE_NUMBER_VALIDATION_ERROR_SELECTOR)
    return phoneNumberErrors.length > 0
  }

  get errorMessageContainer() {
    const errorContainer = document.createElement('div')
    const kitClassName = ERROR_MESSAGE_SELECTOR.replace(/\./, '')
    errorContainer.classList.add(kitClassName)
    errorContainer.setAttribute('role', 'alert')
    errorContainer.setAttribute('aria-live', 'polite')
    return errorContainer
  }
  get formValidationFields() {
    // Query each time so dynamically-mounted required fields are included.
    return this.element.querySelectorAll(REQUIRED_FIELDS_SELECTOR)
  }
}

window.PbFormValidation = PbFormValidation