import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from '../utilities/object'

// Kit selectors
// Most kits use *_kit classnames. Dropdown and multi-level select do not; they
// expose data-pb-* markers on the root instead — include those so bare
// pb_form_with fields still get custom validation messages.
const KIT_SELECTOR             = '[class^="pb_"][class*="_kit"], [data-pb-dropdown], [data-pb-multi-level-select]'
const ERROR_MESSAGE_SELECTOR   = '.pb_body_kit_negative'
const MESSAGE_CONTAINER_SELECTOR = '[data-pb-validation-container="true"]'

// Validation selectors
const FORM_SELECTOR            = 'form[data-pb-form-validation="true"]'
const REQUIRED_FIELDS_SELECTOR = 'input[required],textarea[required],select[required]'
const PHONE_NUMBER_VALIDATION_ERROR_SELECTOR = '[data-pb-phone-validation-error="true"]'

class PbFormValidation extends PbEnhancedElement {
  static get selector() {
    return FORM_SELECTOR
  }

  connect() {
    // `invalid` does not bubble — listen in capture so we still see it.
    // Do not snapshot [required] at connect: dropdown / multi-level select may
    // remove required during their own connect (they register earlier) when a
    // default selection is present, then put it back when cleared.
    this.handleInvalid = (event) => {
      if (!this.isFormValidationField(event.target)) return
      this.validateFormField(event)
    }
    this.element.addEventListener('invalid', this.handleInvalid, true)

    this.handleFieldEvent = debounce((event) => {
      if (!this.isFormValidationField(event.target)) return
      this.validateFormField(event)
    }, 250)
    this.element.addEventListener('change', this.handleFieldEvent)
    this.element.addEventListener('valid', this.handleFieldEvent)

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

  isFormValidationField(field) {
    if (!field?.matches?.(REQUIRED_FIELDS_SELECTOR)) return false
    if (field.closest('.pb_phone_number_input')) return false
    if (field.closest('.pb_time_picker')) return false
    return true
  }

  validateFormField(event) {
    event.preventDefault()
    const { target } = event
    target.setCustomValidity('')
    const isValid = event.target.validity.valid

    if (isValid) {
      this.clearError(target)
    } else {
      this.showValidationMessage(target)
    }
  }

  showValidationMessage(target) {
    const messageContainer = this.messageContainerFor(target)
    const kitElement = messageContainer.closest(KIT_SELECTOR)

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

      if (target.dataset.message) target.setCustomValidity(target.dataset.message)

      errorMessageContainer.innerHTML = target.validationMessage

      // add the error message element to the dom tree
      messageContainer.appendChild(errorMessageContainer)
    }
  }

  clearError(target) {
    const messageContainer = this.messageContainerFor(target)
    const kitElement = messageContainer.closest(KIT_SELECTOR)
    // Remove error class from kit element
    if (kitElement) kitElement.classList.remove('error')
    // Remove error message from the message container (which is the parent element most of thetime)
    const errorMessageContainer = messageContainer.querySelector(ERROR_MESSAGE_SELECTOR)
    if (errorMessageContainer) errorMessageContainer.remove()
  }

  messageContainerFor(target) {
    return target.closest(MESSAGE_CONTAINER_SELECTOR) || target.parentElement
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
    return errorContainer
  }
}

window.PbFormValidation = PbFormValidation

export default PbFormValidation
