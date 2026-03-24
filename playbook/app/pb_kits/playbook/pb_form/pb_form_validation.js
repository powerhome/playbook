import PbEnhancedElement from '../pb_enhanced_element'
import { debounce } from '../utilities/object'

const SELECTORS = {
  kit: '[class^="pb_"][class*="_kit"]',
  errorMessage: '.pb_body_kit_negative',

  form: 'form[data-pb-form-validation="true"]',
  requiredFields: 'input[required],textarea[required],select[required]',
  phoneValidationError: '[data-pb-phone-validation-error="true"]',

  errorParents: [
    '.text_input_wrapper',
    '.pb_select_kit_wrapper',
    '.dropdown_wrapper',
    '.input_wrapper',
    '.pb_typeahead_wrapper',
  ],
  controlWrappers: [
    '.dropdown_wrapper',
    '.pb_select_kit_wrapper',
    '.text_input_wrapper',
  ],
  kitFallbacks: [
    '[data-pb-select]',
    '[data-pb-date-picker]',
    '[data-pb-typeahead-kit]',
  ],
  messageWrappers: [
    '[data-validation-message]',
    '[data-pb-select]',
    '.dropdown_wrapper',
    '.pb_select_kit_wrapper',
  ],
  reactTypeaheadRoots: [
    '[data-pb-react-component="Typeahead"]',
    '.pb_typeahead_kit.react-select',
  ],
}

const ATTRS = {
  message: 'data-pb-form-validation-message',
  reused: 'data-pb-form-validation-message-reused',
}

const FIELD_EVENTS = ['change', 'valid', 'invalid']

const closestAny = (el, selectors) => {
  if (!el || !selectors) return null
  for (const selector of selectors) {
    const found = el.closest?.(selector)
    if (found) return found
  }
  return null
}

const isReactTypeaheadField = (el) => {
  return !!closestAny(el, SELECTORS.reactTypeaheadRoots)
}

const shouldSkipField = (field) => {
  return (
    isReactTypeaheadField(field) ||
    !!field?.closest?.('.pb_phone_number_input, .pb_time_picker')
  )
}

const getKitElement = (target) => {
  return (
    target.closest?.(SELECTORS.kit) ||
    target.parentElement?.closest?.(SELECTORS.kit) ||
    closestAny(target, SELECTORS.kitFallbacks) ||
    null
  )
}

const getControlWrapper = (target, kitElement) => {
  const fromTarget = closestAny(target, SELECTORS.controlWrappers)
  if (fromTarget) return fromTarget

  if (!kitElement) return null
  for (const selector of SELECTORS.controlWrappers) {
    const found = kitElement.querySelector?.(selector)
    if (found) return found
  }

  return null
}

const getErrorParent = (target, kitElement, parentElement) => {
  const candidate =
    closestAny(target, SELECTORS.errorParents) ||
    kitElement ||
    parentElement

  // Never append outside the kit wrapper; prevents portal-ish DOM from causing
  // messages to land at the bottom of the form/page.
  if (
    kitElement &&
    candidate &&
    candidate !== kitElement &&
    !kitElement.contains(candidate)
  ) {
    return kitElement
  }

  return candidate
}

const getValidationMessage = (target, kitElement) => {
  const fromTarget = target.dataset?.message || target.dataset?.validationMessage

  const wrapperWithMessage = closestAny(target, SELECTORS.messageWrappers)
  const fromWrapper = wrapperWithMessage?.dataset?.validationMessage

  const fromKit = kitElement?.dataset?.validationMessage

  return fromTarget || fromWrapper || fromKit || ''
}

const hasNewRequiredFields = (mutations) => {
  return mutations.some((mutation) => {
    return Array.from(mutation.addedNodes || []).some((node) => {
      if (!(node instanceof Element)) return false
      if (node.matches && node.matches(SELECTORS.requiredFields)) return true
      return !!node.querySelector?.(SELECTORS.requiredFields)
    })
  })
}

const createErrorMessageContainer = (doc = document) => {
  const errorContainer = doc.createElement('div')
  const kitClassName = SELECTORS.errorMessage.replace(/\./, '')
  errorContainer.classList.add(kitClassName)
  errorContainer.setAttribute(ATTRS.message, 'true')
  errorContainer.setAttribute('role', 'alert')
  errorContainer.setAttribute('aria-live', 'polite')
  return errorContainer
}

const findOrCreateErrorMessageElement = (errorParent) => {
  let errorMessageElement = errorParent.querySelector(`[${ATTRS.message}="true"]`)
  if (errorMessageElement) return errorMessageElement

  const existingEmpty = Array.from(errorParent.querySelectorAll(SELECTORS.errorMessage)).find((el) => {
    return (el.textContent || '').trim() === ''
  })

  if (existingEmpty) {
    existingEmpty.setAttribute(ATTRS.message, 'true')
    existingEmpty.setAttribute(ATTRS.reused, 'true')
    return existingEmpty
  }

  errorMessageElement = createErrorMessageContainer(errorParent.ownerDocument || document)
  errorParent.appendChild(errorMessageElement)
  return errorMessageElement
}

const clearOurErrorMessage = (errorParent) => {
  const messageEl = errorParent.querySelector(`[${ATTRS.message}="true"]`)
  if (!messageEl) return

  const reused = messageEl.getAttribute(ATTRS.reused) === 'true'
  if (reused) {
    messageEl.textContent = ''
    messageEl.removeAttribute(ATTRS.message)
    messageEl.removeAttribute(ATTRS.reused)
  } else {
    messageEl.remove()
  }
}

class PbFormValidation extends PbEnhancedElement {
  static get selector() {
    return SELECTORS.form
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
      if (!hasNewRequiredFields(mutations)) return
      this.debouncedBindValidationListeners()
    })
    this.mutationObserver.observe(this.element, { childList: true, subtree: true })

    this.element.addEventListener('submit', (event) => {
      // If we intentionally resubmitted (after async phone validation settled),
      // allow the submit through without re-gating.
      if (this._pbBypassNextSubmit) {
        this._pbBypassNextSubmit = false
        return
      }

      const submitter = event.submitter

      const hasInvalidFields = this.validateOnSubmit()
      if (hasInvalidFields) {
        event.preventDefault()
        return false
      }

      // Phone Number Input is skipped from standard validation flow and reports
      // errors asynchronously via data attributes. preventDefault must be called
      // synchronously, so we gate submit here and re-submit after a tick.
      const hasPhoneNumberKit = !!this.element.querySelector('.pb_phone_number_input')
      if (!hasPhoneNumberKit) return

      // If already invalid, block immediately.
      if (this.hasPhoneNumberValidationErrors()) {
        event.preventDefault()
        return false
      }

      // Otherwise, pause submit and re-check after React state updates.
      event.preventDefault()
      setTimeout(() => {
        if (this.hasPhoneNumberValidationErrors()) return

        this._pbBypassNextSubmit = true
        if (typeof this.element.requestSubmit === 'function') {
          // Preserve which button triggered submit when possible
          if (submitter) this.element.requestSubmit(submitter)
          else this.element.requestSubmit()
        } else {
          // Fallback: submits without firing submit event
          this.element.submit()
        }
      }, 0)
    })
  }

  validateOnSubmit() {
    let foundInvalid = false

    this.formValidationFields.forEach((field) => {
      if (shouldSkipField(field)) return

      const isValid = this.validateField(field)
      if (!isValid) foundInvalid = true
    })

    return foundInvalid
  }

  disconnect() {
    if (this.mutationObserver) this.mutationObserver.disconnect()
  }

  bindValidationListeners() {
    this.formValidationFields.forEach((field) => {
      if (this.boundFields?.has(field)) return

      if (shouldSkipField(field)) return

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

    this.validateField(target)
  }

  validateField(target) {
    if (shouldSkipField(target)) return true

    const kitElement = getKitElement(target)
    target.setCustomValidity('')

    if (target.validity.valid) {
      this.clearError(target)
      return true
    }

    const message = getValidationMessage(target, kitElement)
    if (message) target.setCustomValidity(message)
    this.showValidationMessage(target)
    return false
  }

  showValidationMessage(target) {
    const { parentElement } = target
    const kitElement = getKitElement(target)

    // ensure clean error message state
    this.clearError(target)
    if (kitElement) kitElement.classList.add('error')

    const controlWrapper = getControlWrapper(target, kitElement)
    if (controlWrapper) controlWrapper.classList.add('error')

    const errorParent = getErrorParent(target, kitElement, parentElement)
    const message = getValidationMessage(target, kitElement) || target.validationMessage
    const errorMessageElement = findOrCreateErrorMessageElement(errorParent)
    errorMessageElement.textContent = message
  }

  clearError(target) {
    const { parentElement } = target
    const kitElement = getKitElement(target)
    if (kitElement) kitElement.classList.remove('error')

    const controlWrapper = getControlWrapper(target, kitElement)
    if (controlWrapper) controlWrapper.classList.remove('error')

    const errorParent = getErrorParent(target, kitElement, parentElement)
    clearOurErrorMessage(errorParent)
  }

  hasPhoneNumberValidationErrors() {
    const phoneNumberErrors = this.element.querySelectorAll(SELECTORS.phoneValidationError)
    return phoneNumberErrors.length > 0
  }
  get formValidationFields() {
    return this.element.querySelectorAll(SELECTORS.requiredFields)
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