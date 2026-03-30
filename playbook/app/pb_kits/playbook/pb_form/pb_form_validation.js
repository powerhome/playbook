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
    this.boundFields    = new WeakSet()
    this._fieldHandlers = new WeakMap()
    this._typeaheadFieldHandlers = new WeakMap()

    this.bindValidationListeners()
    this._setupMutationObserver()
    this._setupSubmitHandler()
  }

  _setupMutationObserver() {
    this._pendingFieldsToBind    = new Set()
    this._flushPendingFieldBinds = debounce(() => {
      if (!this._pendingFieldsToBind?.size) return
      this._pendingFieldsToBind.forEach((f) => this.bindFieldValidationListeners(f))
      this._pendingFieldsToBind.clear()
    }, 50)

    this.mutationObserver = new MutationObserver((mutations) => {
      let sawRequired = false
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(REQUIRED_FIELDS_SELECTOR)) {
            this._pendingFieldsToBind.add(node)
            sawRequired = true
          }
          node.querySelectorAll?.(REQUIRED_FIELDS_SELECTOR)?.forEach?.((el) => {
            this._pendingFieldsToBind.add(el)
            sawRequired = true
          })
        })
      })
      if (sawRequired) this._flushPendingFieldBinds()
    })

    this.mutationObserver.observe(this.element, { childList: true, subtree: true })
  }

  _setupSubmitHandler() {
    this.element.addEventListener('submit', (event) => {
      if (this.validateOnSubmit()) {
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
      if (this.isTypeaheadField(field)) return

      const isPhoneNumberInput = field.closest('.pb_phone_number_input')
      if (isPhoneNumberInput) return

      const isTimePickerInput = field.closest('.pb_time_picker')
      if (isTimePickerInput) return

      field.setCustomValidity('')
      const ctx = this.getValidationContext(field)

      if (field.validity.valid) {
        this.clearError(field, ctx)
        return
      }

      const message = ctx.validationMessage
      if (message) field.setCustomValidity(message)

      foundInvalid = true
      this.showValidationMessage(field, ctx)
    })

    return foundInvalid
  }

  disconnect() {
    this.mutationObserver?.disconnect()

    this._pendingFieldsToBind?.clear()
    this._pendingFieldsToBind    = null
    this._flushPendingFieldBinds = null
    this._typeaheadFieldHandlers = null
  }

  bindValidationListeners() {
    this.formValidationFields.forEach((field) => this.bindFieldValidationListeners(field))
  }

  bindFieldValidationListeners(field) {
    if (!field || !(field instanceof Element)) return
    if (this.boundFields?.has(field)) return
    if (this.isTypeaheadField(field)) {
      this.bindTypeaheadValidationListeners(field)
      return
    }

    const isPhoneNumberInput = field.closest('.pb_phone_number_input')
    if (isPhoneNumberInput) return

    const isTimePickerInput = field.closest('.pb_time_picker')
    if (isTimePickerInput) return

    let handlers = this._fieldHandlers?.get(field)
    if (!handlers) {
      const debouncedHandler = debounce((event) => {
        this.validateFormField(event)
      }, 250)

      const immediateHandler = (event) => {
        this.validateFormField(event)
      }

      handlers = { debouncedHandler, immediateHandler }
      this._fieldHandlers?.set(field, handlers)
    }

    FIELD_EVENTS.forEach((eventName) => {
      if (eventName === 'invalid') {
        field.addEventListener(eventName, handlers.immediateHandler, true)
      } else if (eventName === 'change' && field.tagName === 'SELECT') {
        field.addEventListener(eventName, handlers.immediateHandler, false)
      } else {
        field.addEventListener(eventName, handlers.debouncedHandler, false)
      }
    })

    this.boundFields?.add(field)
  }

  bindTypeaheadValidationListeners(field) {
    if (!field || !(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return
    if (this.boundFields?.has(field)) return

    let handlers = this._typeaheadFieldHandlers?.get(field)
    if (!handlers) {
      const applyCustomMessage = () => {
        const kitElement = this.getKitElement(field)
        const ctx = this.getValidationContext(field)
        const message = this.getValidationMessage(field, kitElement)

        field.setCustomValidity('')
        if (!message) {
          if (!this.isReactTypeaheadField(field)) this.showValidationMessage(field, ctx)
          return
        }

        if (field.validity.valueMissing || !field.validity.valid) {
          field.setCustomValidity(message)
        }

        if (!this.isReactTypeaheadField(field)) {
          this.showValidationMessage(field, ctx)
        }
      }

      const clearCustomMessage = () => {
        field.setCustomValidity('')
        if (!this.isReactTypeaheadField(field)) {
          this.clearError(field)
        }
      }

      handlers = { applyCustomMessage, clearCustomMessage }
      this._typeaheadFieldHandlers?.set(field, handlers)
    }

    field.addEventListener('invalid', handlers.applyCustomMessage, true)
    field.addEventListener('input', handlers.clearCustomMessage, false)
    field.addEventListener('change', handlers.clearCustomMessage, false)

    this.boundFields?.add(field)
  }

  validateFormField(event) {
    event.preventDefault()
    const { target } = event
    if (this.isTypeaheadField(target)) return

    // Suppress the native browser tooltip; PB shows its own inline error instead.

    const ctx = this.getValidationContext(target)

    target.setCustomValidity('')

    const isValid = target.validity.valid

    if (isValid) {
      this.clearError(target, ctx)
    } else {
      const message = ctx.validationMessage
      if (message) target.setCustomValidity(message)
      this.showValidationMessage(target, ctx)
    }
  }

  getValidationContext(target) {
    const parentElement = target?.parentElement || null
    const kitElement = this.getKitElement(target)
    const controlWrapper = this.getControlWrapper(target, kitElement)
    const errorParent = this.getErrorParent(target, kitElement, parentElement)
    const validationMessage = this.getValidationMessage(target, kitElement)

    return {
      parentElement,
      kitElement,
      controlWrapper,
      errorParent,
      validationMessage,
      isPhoneNumberInput: !!kitElement?.classList?.contains('pb_phone_number_input'),
      isTimePickerInput: !!kitElement?.classList?.contains('pb_time_picker'),
    }
  }

  showValidationMessage(target, ctx = this.getValidationContext(target)) {
    const { kitElement, controlWrapper, errorParent, validationMessage, isPhoneNumberInput, isTimePickerInput } = ctx

    // ensure clean error message state
    this.clearError(target, ctx)
    if (kitElement) kitElement.classList.add('error')

    if (controlWrapper) controlWrapper.classList.add('error')

    if (!isPhoneNumberInput && !isTimePickerInput) {
      const message = validationMessage || target.validationMessage

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
      // If we previously hid a reused error element, unhide it now.
      errorMessageElement.style.display = ""
    }
  }

  clearError(target, ctx = this.getValidationContext(target)) {
    const { kitElement, controlWrapper, errorParent } = ctx
    if (kitElement) kitElement.classList.remove('error')
    if (controlWrapper) controlWrapper.classList.remove('error')
    const messageEl = errorParent.querySelector(`[${FORM_VALIDATION_MESSAGE_ATTR}="true"]`)
    if (messageEl) {
      const reused = messageEl.getAttribute(FORM_VALIDATION_MESSAGE_REUSED_ATTR) === 'true'
      if (reused) {
        messageEl.textContent = ''
        messageEl.style.display = "none"
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

  isTypeaheadField(el) {
    return !!el?.closest?.('.pb_typeahead_kit')
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