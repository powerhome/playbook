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
    this.formValidationFields.forEach((field) => {
      // Skip phone number inputs - they handle their own validation
      const isPhoneNumberInput = field.closest('.pb_phone_number_input')
      if (isPhoneNumberInput) return

      FIELD_EVENTS.forEach((e) => {
        field.addEventListener(e, debounce((event) => {
          this.validateFormField(event)
        }, 250), false)
      })
    })

    // Add event listener to check for phone number validation errors
    this.element.addEventListener('submit', (event) => {
      if (this.hasPhoneNumberValidationErrors()) {
        event.preventDefault()
        return false
      }
    })
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
    const { parentElement } = target
    const kitElement = parentElement.closest(KIT_SELECTOR)

    // Check if this is a phone number input
    const isPhoneNumberInput = kitElement && kitElement.classList.contains('pb_phone_number_input')

    // ensure clean error message state
    this.clearError(target)
    kitElement.classList.add('error')

    // Only add error message if it's NOT a phone number input
    if (!isPhoneNumberInput) {
      // set the error message element
      const errorMessageContainer = this.errorMessageContainer

      if (target.dataset.message) target.setCustomValidity(target.dataset.message)

      errorMessageContainer.innerHTML = target.validationMessage

      // add the error message element to the dom tree
      parentElement.appendChild(errorMessageContainer)
    }
  }

  clearError(target) {
    const { parentElement } = target
    const kitElement = parentElement.closest(KIT_SELECTOR)
    // Remove error class from kit element
    if (kitElement) kitElement.classList.remove('error')
    // Remove error message from parent element
    const errorMessageContainer = parentElement.querySelector(ERROR_MESSAGE_SELECTOR)
    if (errorMessageContainer) errorMessageContainer.remove()
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
  get formValidationFields() {
    return this._formValidationFields =
      this._formValidationFields || this.element.querySelectorAll(REQUIRED_FIELDS_SELECTOR)
  }
}

window.PbFormValidation = PbFormValidation
