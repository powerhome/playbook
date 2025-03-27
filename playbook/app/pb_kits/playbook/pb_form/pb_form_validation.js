import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from '../utilities/object'

// Kit selectors
const KIT_SELECTOR             = '[class^="pb_"][class*="_kit"]'
const ERROR_MESSAGE_SELECTOR   = '.pb_body_kit_negative'

// Validation selectors
const FORM_SELECTOR            = 'form[data-pb-form-validation="true"]'
const REQUIRED_FIELDS_SELECTOR = 'input[required],textarea[required],select[required]'

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
      FIELD_EVENTS.forEach((e) => {
        field.addEventListener(e, debounce((event) => {
          this.validateFormField(event)
        }, 250), false)
      })
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

    // ensure clean error message state
    this.clearError(target)
    parentElement.closest(KIT_SELECTOR).classList.add('error')

    // set the error message element
    const errorMessageContainer = this.errorMessageContainer

    if (target.dataset.message) target.setCustomValidity(target.dataset.message)

    errorMessageContainer.innerHTML = target.validationMessage

    // add the error message element to the dom tree
    parentElement.appendChild(errorMessageContainer)
  }

  clearError(target) {
    const { parentElement } = target
    parentElement.closest(KIT_SELECTOR).classList.remove('error')
    const errorMessageContainer = parentElement.querySelector(ERROR_MESSAGE_SELECTOR)
    if (errorMessageContainer) errorMessageContainer.remove()
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
