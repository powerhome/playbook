import intlTelInput from 'intl-tel-input/build/js/intlTelInputWithUtils.js'

import PbEnhancedElement from '../pb_enhanced_element'

const PHONE_NUMBER_INPUT_SELECTOR = '[data-pb-phone-number-input]'
const TEXT_INPUT_KIT_SELECTOR = '.pb_text_input_kit'
const MESSAGE_CONTAINER_SELECTOR = '[data-pb-validation-container="true"]'
const ERROR_MESSAGE_SELECTOR = '.pb_body_kit_negative'

enum ValidationError {
  TooShort = 2,
  TooLong = 3,
  MissingAreaCode = 4,
  SomethingWentWrong = -99
}

type PhoneNumberInputConfig = {
  countrySearch?: boolean,
  dark?: boolean,
  disabled?: boolean,
  error?: string,
  excludeCountries?: string[],
  formatAsYouType?: boolean,
  hiddenInputs?: boolean,
  initialCountry?: string,
  name?: string,
  onlyCountries?: string[],
  preferredCountries?: string[],
  required?: boolean,
  showPlaceholder?: boolean,
  strictMode?: boolean,
}

type IntlTelInputInstance = {
  destroy?: () => void,
  getSelectedCountryData: () => { dialCode?: string, iso2?: string, name?: string },
  getValidationError: () => number,
  isValidNumber: () => boolean,
}

const formatToGlobalCountryName = (countryName: string) => {
  return countryName.split("(")[0].trim()
}

const formatAllCountries = () => {
  const countryData = intlTelInput.getCountryData?.()
  if (!countryData) return

  for (let i = 0; i < countryData.length; i++) {
    const country = countryData[i]
    country.name = formatToGlobalCountryName(country.name)
  }
}

formatAllCountries()

const containOnlyNumbers = (value: string) => {
  return /^[()+\-. \d]*$/.test(value)
}

const unformatNumber = (formattedNumber: string) => {
  return formattedNumber.replace(/\D/g, "")
}

export default class PbPhoneNumberInput extends PbEnhancedElement {
  static get selector(): string {
    return PHONE_NUMBER_INPUT_SELECTOR
  }

  private input: HTMLInputElement | null = null
  private textInputKit: HTMLElement | null = null
  private iti: IntlTelInputInstance | null = null
  private config: PhoneNumberInputConfig = {}
  private error = ""
  private hasBlurred = false
  private formSubmitted = false
  private hasStartedValidating = false
  private placeholderTemplate: string | null = null
  private handleInvalidBound = (event: Event) => this.handleInvalid(event)

  connect(): void {
    formatAllCountries()

    this.input = this.element.querySelector('input[type="tel"], input.text_input')
    this.textInputKit = this.element.querySelector(TEXT_INPUT_KIT_SELECTOR)
    this.config = this.parseConfig()
    this.error = this.config.error || this.readExistingError()

    if (this.error) this.formSubmitted = true
    if (!this.input) return

    this.initIntlTelInput()
    this.bindEvents()
    this.updatePhoneNumberData()
    this.updateValidationState(this.error.length > 0)
  }

  disconnect(): void {
    if (this.input) {
      this.input.removeEventListener("countrychange", this.handleCountryChange)
      this.input.removeEventListener("open:countrydropdown", this.handleDropdownOpen)
      this.input.removeEventListener("close:countrydropdown", this.handleDropdownClose)
      this.input.removeEventListener("focus", this.handleFocus)
      this.input.removeEventListener("blur", this.handleBlur)
      this.input.removeEventListener("input", this.handleInput)
      this.input.removeEventListener("change", this.handleInput)
    }

    document.removeEventListener("invalid", this.handleInvalidBound, true)
    this.iti?.destroy?.()
    this.iti = null
  }

  private parseConfig(): PhoneNumberInputConfig {
    const raw = (this.element as HTMLElement).dataset.pbPhoneNumberInputConfig
    if (!raw) return {}

    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }

  private readExistingError() {
    return this.element.querySelector(ERROR_MESSAGE_SELECTOR)?.textContent?.trim() || ""
  }

  private get fallbackCountry() {
    const preferredCountries = this.config.preferredCountries || []
    const onlyCountries = this.config.onlyCountries || []
    const excludeCountries = this.config.excludeCountries || []

    if (preferredCountries.length > 0) return preferredCountries[0]
    if (onlyCountries.length > 0) return [...onlyCountries].sort()[0]
    if (excludeCountries.length > 0) return [...excludeCountries].sort()[0]
    return "af"
  }

  private initIntlTelInput() {
    const name = this.config.name || this.input.name || ""
    const preferredCountries = this.config.preferredCountries || []
    const onlyCountries = this.config.onlyCountries || []
    const excludeCountries = this.config.excludeCountries || []

    this.iti = intlTelInput(this.input, {
      separateDialCode: true,
      countryOrder: preferredCountries,
      allowDropdown: !this.config.disabled,
      autoInsertDialCode: false,
      autoPlaceholder: this.config.showPlaceholder ? "polite" : "off",
      initialCountry: this.config.initialCountry || this.fallbackCountry,
      onlyCountries,
      excludeCountries,
      countrySearch: !!this.config.countrySearch,
      fixDropdownWidth: false,
      formatAsYouType: !!this.config.formatAsYouType,
      strictMode: !!this.config.strictMode,
      hiddenInput: this.config.hiddenInputs ? () => ({
        phone: `${name}_full`,
        country: `${name}_country_code`,
      }) : null,
    })
  }

  private bindEvents() {
    this.input.addEventListener("countrychange", this.handleCountryChange)
    this.input.addEventListener("open:countrydropdown", this.handleDropdownOpen)
    this.input.addEventListener("close:countrydropdown", this.handleDropdownClose)
    this.input.addEventListener("focus", this.handleFocus)
    this.input.addEventListener("blur", this.handleBlur)
    this.input.addEventListener("input", this.handleInput)
    this.input.addEventListener("change", this.handleInput)
    document.addEventListener("invalid", this.handleInvalidBound, true)
  }

  private handleCountryChange = () => {
    this.updatePhoneNumberData()
    this.validateErrors()

    if (!this.config.showPlaceholder) return

    const syncPlaceholderState = () => {
      if (!this.input) return
      this.cachePlaceholderTemplate(this.input)
      if (this.hidePlaceholderIfFocusedAndEmpty(this.input)) return
      this.restorePlaceholderIfEmpty(this.input)
    }

    syncPlaceholderState()
    setTimeout(syncPlaceholderState, 0)
  }

  private handleDropdownOpen = () => {
    this.textInputKit?.classList.add("dropdown_open")
  }

  private handleDropdownClose = () => {
    this.textInputKit?.classList.remove("dropdown_open")
  }

  private handleFocus = () => {
    if (!this.config.showPlaceholder || !this.input || this.input.value) return
    this.cachePlaceholderTemplate(this.input)
    this.hidePlaceholderIfEmpty(this.input)
  }

  private handleBlur = () => {
    if (this.config.showPlaceholder && this.input && !this.input.value) {
      this.restorePlaceholderIfEmpty(this.input)
    }

    this.hasBlurred = true
    this.validateErrors()
  }

  private handleInput = () => {
    this.formSubmitted = false
    this.updatePhoneNumberData()

    if (!this.inputValue().trim()) {
      this.error = ""
      this.removeError()
      this.updateValidationState(false)
    }
  }

  private handleInvalid(event: Event) {
    const target = event.target as Element | null
    if (!target || !this.element.contains(target)) return

    this.formSubmitted = true
    this.validateErrors()
  }

  private updatePhoneNumberData() {
    if (!this.iti || !this.input) return

    const selected = { ...this.iti.getSelectedCountryData(), number: this.input.value }
    if (this.config.formatAsYouType) {
      selected.number = unformatNumber(selected.number)
    }
    this.input.setAttribute("data-phone-number", JSON.stringify(selected))
  }

  private inputValue() {
    return this.input?.value || ""
  }

  private validateErrors() {
    if (!this.hasStartedValidating) this.hasStartedValidating = true

    const value = this.inputValue()
    if (!value || value.trim() === "") {
      if (this.validateRequiredField()) return
      if (!this.config.required) this.setError("")
      return
    }

    if (!this.hasBlurred && !this.formSubmitted) return
    if (!this.iti) return

    if (this.validateOnlyNumbers()) return
    if (this.validateTooLongNumber()) return
    if (this.validateTooShortNumber()) return
    if (this.validateUnhandledError()) return
    if (this.validateMissingAreaCode()) return
    if (this.validateRepeatCountryCode()) return

    this.setError("")
  }

  private validateRequiredField() {
    if (this.config.required && (!this.inputValue() || this.inputValue().trim() === "")) {
      this.setError("Missing phone number")
      return true
    }
    return false
  }

  private validateOnlyNumbers() {
    if (this.inputValue() && !containOnlyNumbers(this.inputValue())) {
      return this.showFormattedError("enter numbers only")
    }
    return false
  }

  private validateTooLongNumber() {
    if (this.iti.getValidationError() === ValidationError.TooLong) {
      return this.showFormattedError("too long")
    }
    return false
  }

  private validateTooShortNumber() {
    if (!this.inputValue() || this.inputValue().trim() === "") {
      this.setError("")
      return false
    }

    if (this.iti.getValidationError() === ValidationError.TooShort) {
      return this.showFormattedError("too short")
    }

    if (this.inputValue().length === 1) {
      return this.showFormattedError("too short")
    }

    return false
  }

  private validateUnhandledError() {
    if (!this.config.required) return false
    if (this.iti.getValidationError() !== ValidationError.SomethingWentWrong) return false

    if (this.inputValue().length === 1) {
      return this.showFormattedError("too short")
    }
    if (this.inputValue().length === 0) {
      this.setError("Missing phone number")
      return true
    }
    return this.showFormattedError()
  }

  private validateMissingAreaCode() {
    if (this.iti.getValidationError() === ValidationError.MissingAreaCode) {
      return this.showFormattedError("missing area code")
    }
    return false
  }

  private validateRepeatCountryCode() {
    const countryDialCode = this.iti.getSelectedCountryData().dialCode
    if (unformatNumber(this.inputValue()).startsWith(countryDialCode)) {
      return this.showFormattedError("repeat country code")
    }
    return false
  }

  private showFormattedError(reason = "") {
    const countryName = this.iti.getSelectedCountryData().name
    const reasonText = reason.length > 0 ? ` (${reason})` : ""
    this.setError(`Invalid ${countryName} phone number${reasonText}`)
    return true
  }

  private setError(message: string) {
    this.error = message
    this.syncErrorDisplay()
    this.updateValidationState(message.length > 0)
  }

  private syncErrorDisplay() {
    const shouldShow = (this.hasBlurred || this.formSubmitted) && this.error
    if (shouldShow) {
      this.renderError(this.error)
    } else if (!this.config.error || this.hasStartedValidating) {
      this.removeError()
    }
  }

  private errorElementId() {
    const inputId = this.input?.id
    return inputId ? `${inputId}-error` : "pb-phone-number-input-error"
  }

  private syncErrorAria(errorId: string | null) {
    if (!this.input) return

    if (errorId) {
      this.input.setAttribute("aria-invalid", "true")
      this.input.setAttribute("aria-describedby", errorId)
    } else {
      this.input.setAttribute("aria-invalid", "false")
      this.input.removeAttribute("aria-describedby")
    }
  }

  private renderError(message: string) {
    this.textInputKit?.classList.add("error")

    const container = this.element.querySelector(MESSAGE_CONTAINER_SELECTOR)
    if (!container) return

    const errorId = this.errorElementId()
    let errorEl = container.querySelector(ERROR_MESSAGE_SELECTOR) as HTMLElement | null
    if (!errorEl) {
      errorEl = document.createElement("div")
      errorEl.className = this.config.dark ? "pb_body_kit_negative dark" : "pb_body_kit_negative"
      errorEl.setAttribute("role", "alert")
      errorEl.setAttribute("aria-atomic", "true")
      errorEl.setAttribute("aria-live", "polite")
      container.appendChild(errorEl)
    }
    errorEl.id = errorId
    errorEl.textContent = message
    this.syncErrorAria(errorId)
  }

  private removeError() {
    this.textInputKit?.classList.remove("error")
    this.element.querySelector(ERROR_MESSAGE_SELECTOR)?.remove()
    this.syncErrorAria(null)
  }

  private updateValidationState(hasError: boolean) {
    if (this.config.required) {
      if (hasError) {
        this.element.setAttribute("data-pb-phone-validation-error", "true")
      } else {
        this.element.removeAttribute("data-pb-phone-validation-error")
      }
    }

    if (!this.input) return
    this.input.setCustomValidity(hasError && this.error ? this.error : "")
  }

  private cachePlaceholderTemplate(element: HTMLInputElement) {
    const placeholder = element.getAttribute("placeholder") || element.placeholder || ""
    if (placeholder) this.placeholderTemplate = placeholder
  }

  private hidePlaceholderIfFocusedAndEmpty(element: HTMLInputElement) {
    if (document.activeElement === element && !element.value) {
      element.setAttribute("placeholder", "")
      return true
    }
    return false
  }

  private hidePlaceholderIfEmpty(element: HTMLInputElement) {
    if (!element.value) element.setAttribute("placeholder", "")
  }

  private restorePlaceholderIfEmpty(element: HTMLInputElement) {
    if (!element.value && this.placeholderTemplate) {
      element.setAttribute("placeholder", this.placeholderTemplate)
    }
  }
}
