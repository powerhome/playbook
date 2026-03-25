import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from '../utilities/object'

// Kit selectors
const KIT_SELECTOR             = '[class^="pb_"][class*="_kit"]'
const ERROR_MESSAGE_SELECTOR   = '.pb_body_kit_negative'

// Validation selectors
const FORM_SELECTOR            = 'form[data-pb-form-validation="true"]'
const REQUIRED_FIELDS_SELECTOR = 'input[required],textarea[required],select[required]'
const PHONE_NUMBER_VALIDATION_ERROR_SELECTOR = '[data-pb-phone-validation-error="true"]'
const FORM_VALIDATION_MESSAGE_ATTR = 'data-pb-form-validation-message'
const FORM_VALIDATION_MESSAGE_REUSED_ATTR = 'data-pb-form-validation-message-reused'

const FIELD_EVENTS = [
  'change',
  'valid',
  'invalid',
]
class PbFormValidation extends PbEnhancedElement {
  static get selector() {
    return FORM_SELECTOR
  }

  static start() {
    if (this.__pbStarted) return
    this.__pbStarted = true
    super.start()
  }

  connect() {
    this.boundFields = new WeakSet()
    this.bindValidationListeners()

    this.debouncedBindValidationListeners = debounce(() => {
      this.bindValidationListeners()
    }, 100)

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.hasNewRequiredFields(mutations)) return
      this.debouncedBindValidationListeners()
    })
    this.mutationObserver.observe(this.element, { childList: true, subtree: true })

    this.element.addEventListener('submit', (event) => {
      const hasInvalidFields = this.validateOnSubmit()
      if (hasInvalidFields) {
        event.preventDefault()
        return false
      }

      setTimeout(() => {
        if (this.hasPhoneNumberValidationErrors()) {
          event.preventDefault()
          return false
        }
      }, 0)
    })
  }

  validateOnSubmit() {
    let foundInvalid = false

    this.formValidationFields.forEach((field) => {
      if (this.isReactTypeaheadField(field)) return

      const isPhoneNumberInput = field.closest('.pb_phone_number_input')
      if (isPhoneNumberInput) return

      const isTimePickerInput = field.closest('.pb_time_picker')
      if (isTimePickerInput) return

      field.setCustomValidity('')
      const kitElement = this.getKitElement(field)

      if (field.validity.valid) {
        this.clearError(field)
        return
      }

      const message = this.getValidationMessage(field, kitElement)
      if (message) field.setCustomValidity(message)

      foundInvalid = true
      this.showValidationMessage(field)
    })

    return foundInvalid
  }

  disconnect() {
    if (this.mutationObserver) this.mutationObserver.disconnect()
  }

  bindValidationListeners() {
    this.formValidationFields.forEach((field) => {
      if (this.boundFields?.has(field)) return

      if (this.isReactTypeaheadField(field)) return

      const isPhoneNumberInput = field.closest('.pb_phone_number_input')
      if (isPhoneNumberInput) return

      const isTimePickerInput = field.closest('.pb_time_picker')
      if (isTimePickerInput) return

      const debouncedHandler = debounce((event) => {
        this.validateFormField(event)
      }, 250)

      const invalidHandler = (event) => {
        this.validateFormField(event)
      }

      FIELD_EVENTS.forEach((eventName) => {
        if (eventName === 'invalid') {
          field.addEventListener(eventName, invalidHandler, true)
        } else {
          field.addEventListener(eventName, debouncedHandler, false)
        }
      })

      this.boundFields?.add(field)
    })
  }

  validateFormField(event) {
    if (event.type === 'invalid') event.preventDefault()

    const { target } = event

    if (this.isReactTypeaheadField(target)) return

    const kitElement = this.getKitElement(target)

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

    const isPhoneNumberInput = kitElement?.classList?.contains('pb_phone_number_input') || false
    const isTimePickerInput = kitElement?.classList?.contains('pb_time_picker') || false

    // ensure clean error message state
    this.clearError(target)
    if (kitElement) kitElement.classList.add('error')

    const controlWrapper = this.getControlWrapper(target, kitElement)
    if (controlWrapper) controlWrapper.classList.add('error')

    if (!isPhoneNumberInput && !isTimePickerInput) {
      const errorParent = this.getErrorParent(target, kitElement, parentElement)
      const message = this.getValidationMessage(target, kitElement) || target.validationMessage

      let errorMessageElement = errorParent.querySelector(`[${FORM_VALIDATION_MESSAGE_ATTR}="true"]`)
      if (!errorMessageElement) {
        const existingEmpty = Array.from(errorParent.querySelectorAll(ERROR_MESSAGE_SELECTOR)).find((el) => {
          return (el.textContent || '').trim() === ''
        })
        if (existingEmpty) {
          errorMessageElement = existingEmpty
          errorMessageElement.setAttribute(FORM_VALIDATION_MESSAGE_ATTR, 'true')
          errorMessageElement.setAttribute(FORM_VALIDATION_MESSAGE_REUSED_ATTR, 'true')
        }
      }

      if (!errorMessageElement) {
        errorMessageElement = this.errorMessageContainer
        errorParent.appendChild(errorMessageElement)
      }

      errorMessageElement.textContent = message
    }
  }

  clearError(target) {
    const { parentElement } = target
    const kitElement = this.getKitElement(target)
    if (kitElement) kitElement.classList.remove('error')

    const controlWrapper = this.getControlWrapper(target, kitElement)
    if (controlWrapper) controlWrapper.classList.remove('error')

    const errorParent = this.getErrorParent(target, kitElement, parentElement)
    const messageEl = errorParent.querySelector(`[${FORM_VALIDATION_MESSAGE_ATTR}="true"]`)
    if (messageEl) {
      const reused = messageEl.getAttribute(FORM_VALIDATION_MESSAGE_REUSED_ATTR) === 'true'
      if (reused) {
        messageEl.textContent = ''
        messageEl.removeAttribute(FORM_VALIDATION_MESSAGE_ATTR)
        messageEl.removeAttribute(FORM_VALIDATION_MESSAGE_REUSED_ATTR)
      } else {
        messageEl.remove()
      }
    }
  }

  getErrorParent(target, kitElement, parentElement) {
    const candidate =
      target.closest('.text_input_wrapper') ||
      target.closest('.pb_select_kit_wrapper') ||
      target.closest('.dropdown_wrapper') ||
      target.closest('.input_wrapper') ||
      target.closest('.pb_typeahead_wrapper') ||
      kitElement ||
      parentElement

    if (kitElement && candidate && candidate !== kitElement && !kitElement.contains(candidate)) {
      return kitElement
    }

    return candidate
  }

  getControlWrapper(target, kitElement) {
    return (
      target.closest('.dropdown_wrapper') ||
      target.closest('.pb_select_kit_wrapper') ||
      target.closest('.text_input_wrapper') ||
      kitElement?.querySelector?.('.dropdown_wrapper') ||
      kitElement?.querySelector?.('.pb_select_kit_wrapper') ||
      null
    )
  }

  isReactTypeaheadField(el) {
    return !!(
      el?.closest?.('[data-pb-react-component="Typeahead"]') ||
      el?.closest?.('.pb_typeahead_kit.react-select')
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
    return (
      target.closest(KIT_SELECTOR) ||
      target.parentElement?.closest(KIT_SELECTOR) ||
      // Some kits don't expose a *_kit class but do expose data hooks.
      target.closest('[data-pb-select]') ||
      target.closest('[data-pb-date-picker]') ||
      target.closest('[data-pb-typeahead-kit]') ||
      null
    )
  }

  getValidationMessage(target, kitElement) {
    const fromTarget = target.dataset?.message || target.dataset?.validationMessage

    const wrapperWithMessage =
      target.closest?.('[data-validation-message]') ||
      target.closest?.('[data-pb-select]') ||
      target.closest?.('.dropdown_wrapper') ||
      target.closest?.('.pb_select_kit_wrapper')
    const fromWrapper = wrapperWithMessage?.dataset?.validationMessage

    const fromKit = kitElement?.dataset?.validationMessage

    return fromTarget || fromWrapper || fromKit || ''
  }

  hasPhoneNumberValidationErrors() {
    const phoneNumberErrors = this.element.querySelectorAll(PHONE_NUMBER_VALIDATION_ERROR_SELECTOR)
    return phoneNumberErrors.length > 0
  }

  get errorMessageContainer() {
    const errorContainer = document.createElement('div')
    const kitClassName = ERROR_MESSAGE_SELECTOR.replace(/\./, '')
    errorContainer.classList.add(kitClassName)
    errorContainer.setAttribute(FORM_VALIDATION_MESSAGE_ATTR, 'true')
    errorContainer.setAttribute('role', 'alert')
    errorContainer.setAttribute('aria-live', 'polite')
    return errorContainer
  }
  get formValidationFields() {
    return this.element.querySelectorAll(REQUIRED_FIELDS_SELECTOR)
  }
}

window.PbFormValidation = PbFormValidation

const __pbStartFormValidation = () => {
  if (!window.PbFormValidation || typeof window.PbFormValidation.start !== 'function') return
  if (window.__pbFormValidationStarted) return
  window.__pbFormValidationStarted = true
  window.PbFormValidation.start()
}

document.addEventListener('DOMContentLoaded', __pbStartFormValidation)
document.addEventListener('turbo:load', __pbStartFormValidation)
document.addEventListener('turbo:render', __pbStartFormValidation)