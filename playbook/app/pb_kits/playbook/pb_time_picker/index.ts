import PbEnhancedElement from '../pb_enhanced_element'
import {
  parseTime,
  parseTimeToMinutes,
  isTimeInRange as isTimeInRangeHelper,
  isAnyAMTimeValid as isAnyAMTimeValidHelper,
  isAnyPMTimeValid as isAnyPMTimeValidHelper,
  getDisplayTime,
  get24HourTime,
  getTimeRangeErrorMessage,
  getTimezoneText,
  getHourConstraints,
  processHourInput,
  normalizeHourOnBlur,
  processMinuteInput,
  normalizeMinuteOnBlur,
  generateHourOptions,
  generateMinuteOptions,
  getValidInitialMeridiem as getValidInitialMeridiemHelper,
  TimeFormat,
  ParsedTime,
} from './time_picker_helper'

const VALIDATION_MESSAGE_CLASS = '.pb_body_kit_negative'
const VALIDATION_ERROR_SELECTOR = '[data-pb-time-picker-validation-error]'

type Meridiem = 'AM' | 'PM'

const TIME_PICKER_SELECTOR = '[data-pb-time-picker]'
const RANGE_ERROR_TEXT_SELECTOR = '[data-pb-time-picker-range-error-text]'
const TIMEZONE_TEXT_SELECTOR = '[data-pb-time-picker-timezone-text]'

export default class PbTimePicker extends PbEnhancedElement {
  static get selector(): string {
    return TIME_PICKER_SELECTOR
  }

  private pickerId: string
  private timeFormat: TimeFormat
  private fieldName: string
  private minTimeMinutes: number | null
  private maxTimeMinutes: number | null
  private required: boolean
  private disabled: boolean
  private validationMessage: string
  private showTimezone: boolean
  private staticError: string

  private mainInput: HTMLInputElement
  private dropdownContainer: HTMLElement
  private hourInput: HTMLInputElement
  private minuteInput: HTMLInputElement
  private hourDropdown: HTMLElement
  private minuteDropdown: HTMLElement
  private rangeErrorContainer: HTMLElement | null
  private rangeErrorText: HTMLElement | null
  private amRadio: HTMLInputElement | null
  private pmRadio: HTMLInputElement | null
  private amCard: HTMLElement | null
  private pmCard: HTMLElement | null

  private hour = 12
  private minute = 0
  private meridiem: Meridiem = 'PM'
  private hasSelectedTime = false
  private hourInputValue = '12'
  private minuteInputValue = '00'
  private displayValue = ''
  private lastValidTime: ParsedTime | null = null
  private showDropdown = false
  private showHourDropdown = false
  private showMinuteDropdown = false
  private formSubmitted = false

  private handleInvalidBound: (event: Event) => void
  private handleClickOutsideBound: (event: MouseEvent) => void
  private handleMeridiemKeyDownBound: (event: KeyboardEvent) => void
  private handleFormSubmitBound: (event: Event) => void

  private formElement: HTMLFormElement | null = null
  private initialized = false

  private initializeState(): void {
    if (this.initialized) return
    this.initialized = true

    const element = this.element as HTMLElement
    this.pickerId = element.id
    const dataset = element.dataset

    this.timeFormat = (dataset.timeFormat as TimeFormat) || 'AMPM'
    this.fieldName = dataset.fieldName || `${this.pickerId}-time`
    this.minTimeMinutes = parseTimeToMinutes(dataset.minTime)
    this.maxTimeMinutes = parseTimeToMinutes(dataset.maxTime)
    this.required = dataset.required === 'true'
    this.disabled = dataset.disabled === 'true'
    this.validationMessage = dataset.validationMessage || ''
    this.showTimezone = dataset.showTimezone === 'true'
    const staticErrorEl = element.querySelector('.text_input_wrapper ' + VALIDATION_MESSAGE_CLASS) as HTMLElement | null
    this.staticError = staticErrorEl?.textContent?.trim() || ''

    const initialTimeStr = dataset.value || dataset.defaultTime
    const initialTime = parseTime(initialTimeStr, this.timeFormat)
    const validMeridiem = this.getValidInitialMeridiem(initialTime.meridiem)
    const hasInitial = !!initialTimeStr

    this.hour = initialTime.hour
    this.minute = initialTime.minute
    this.meridiem = validMeridiem
    this.hasSelectedTime = hasInitial
    this.hourInputValue = initialTime.hour.toString()
    this.minuteInputValue = initialTime.minute.toString().padStart(2, '0')
    this.displayValue = hasInitial
      ? getDisplayTime(this.hour, this.minute, this.meridiem, this.timeFormat)
      : ''
    this.lastValidTime = hasInitial && this.isTimeInRange(this.hour, this.minute, this.meridiem)
      ? { hour: this.hour, minute: this.minute, meridiem: this.meridiem }
      : null

    this.mainInput = element.querySelector(`#${this.pickerId}-input`) as HTMLInputElement
    this.fieldName = this.mainInput?.name || this.fieldName
    this.dropdownContainer = element.querySelector('[data-pb-time-picker-dropdown]') as HTMLElement
    this.hourInput = element.querySelector('[data-pb-time-picker-hour-input]') as HTMLInputElement
    this.minuteInput = element.querySelector('[data-pb-time-picker-minute-input]') as HTMLInputElement
    this.hourDropdown = element.querySelector('[data-pb-time-picker-hour-dropdown]') as HTMLElement
    this.minuteDropdown = element.querySelector('[data-pb-time-picker-minute-dropdown]') as HTMLElement
    this.rangeErrorContainer = element.querySelector('[data-pb-time-picker-range-error]')
    this.rangeErrorText = element.querySelector(RANGE_ERROR_TEXT_SELECTOR) as HTMLElement | null
    this.amRadio = element.querySelector(`#${this.pickerId}-am`) as HTMLInputElement | null
    this.pmRadio = element.querySelector(`#${this.pickerId}-pm`) as HTMLInputElement | null
    this.amCard = element.querySelector('.pb_time_picker_meridiem_am') as HTMLElement | null
    this.pmCard = element.querySelector('.pb_time_picker_meridiem_pm') as HTMLElement | null

    this.handleInvalidBound = this.handleInvalid.bind(this)
    this.handleClickOutsideBound = this.handleClickOutside.bind(this)
    this.handleMeridiemKeyDownBound = this.handleMeridiemKeyDown.bind(this)
    this.handleFormSubmitBound = this.handleFormSubmit.bind(this)
    this.formElement = element.closest('form')
  }

  connect(): void {
    this.initializeState()

    this.populateDropdowns()
    if (this.showTimezone) this.setTimezoneText()
    this.updateUI()
    this.bindEvents()
    this.bindFormValidation()
    document.addEventListener('invalid', this.handleInvalidBound, true)
  }

  disconnect(): void {
    this.formElement?.removeEventListener('submit', this.handleFormSubmitBound, true)
    document.removeEventListener('invalid', this.handleInvalidBound, true)
    document.removeEventListener('mousedown', this.handleClickOutsideBound)
    this.amRadio?.removeEventListener('keydown', this.handleMeridiemKeyDownBound)
    this.pmRadio?.removeEventListener('keydown', this.handleMeridiemKeyDownBound)
    this.unbindMainInputEvents()
    this.unbindDropdownInputEvents()
    this.initialized = false
  }

  private isTimeInRange(h: number, m: number, mer?: Meridiem): boolean {
    return isTimeInRangeHelper(h, m, mer, this.timeFormat, this.minTimeMinutes, this.maxTimeMinutes)
  }

  private isCurrentTimeValid(): boolean {
    return this.isTimeInRange(this.hour, this.minute, this.meridiem)
  }

  private isAnyAMTimeValid(): boolean {
    return isAnyAMTimeValidHelper(this.minTimeMinutes, this.maxTimeMinutes)
  }

  private isAnyPMTimeValid(): boolean {
    return isAnyPMTimeValidHelper(this.minTimeMinutes, this.maxTimeMinutes)
  }

  private getValidInitialMeridiem(parsedMeridiem: Meridiem): Meridiem {
    return getValidInitialMeridiemHelper(parsedMeridiem, this.minTimeMinutes, this.maxTimeMinutes)
  }

  private get24HourTimeString(): string {
    return get24HourTime(this.hour, this.minute, this.meridiem, this.timeFormat)
  }

  private dispatchChange(time: string): void {
    this.element.dispatchEvent(
      new CustomEvent('pb-time-picker-change', { detail: { time }, bubbles: true }),
    )
  }

  private dispatchClose(time: string): void {
    this.element.dispatchEvent(
      new CustomEvent('pb-time-picker-close', { detail: { time }, bubbles: true }),
    )
  }

  private populateDropdowns(): void {
    this.hourDropdown.innerHTML = ''
    generateHourOptions(this.timeFormat).forEach((h) => {
      const option = document.createElement('div')
      option.className = 'time_dropdown_option'
      option.dataset.hour = h.toString()
      option.textContent = this.timeFormat === '24hour' ? h.toString().padStart(2, '0') : h.toString()
      option.addEventListener('mousedown', (e) => {
        e.preventDefault()
        this.handleHourOptionClick(h)
      })
      this.hourDropdown.appendChild(option)
    })

    this.minuteDropdown.innerHTML = ''
    generateMinuteOptions().forEach((m) => {
      const option = document.createElement('div')
      option.className = 'time_dropdown_option'
      option.dataset.minute = m.toString()
      option.textContent = m.toString().padStart(2, '0')
      option.addEventListener('mousedown', (e) => {
        e.preventDefault()
        this.handleMinuteOptionClick(m)
      })
      this.minuteDropdown.appendChild(option)
    })
  }

  private setTimezoneText(): void {
    const timezoneEl = this.element.querySelector(TIMEZONE_TEXT_SELECTOR) as HTMLElement | null
    if (timezoneEl) timezoneEl.textContent = getTimezoneText()
  }

  private scrollDropdownToSelected(dropdown: HTMLElement): void {
    const selectedOption = dropdown.querySelector('.selected') as HTMLElement
    if (selectedOption) {
      const dropdownHeight = dropdown.clientHeight
      const optionTop = selectedOption.offsetTop
      const optionHeight = selectedOption.clientHeight
      dropdown.scrollTop = optionTop - (dropdownHeight / 2) + (optionHeight / 2)
    }
  }

  private updateUI(): void {
    const { maxHour, minHour } = getHourConstraints(this.timeFormat)

    if (this.hasSelectedTime) {
      this.displayValue = getDisplayTime(this.hour, this.minute, this.meridiem, this.timeFormat)
    }

    this.mainInput.value = this.displayValue

    if (this.hasSelectedTime && this.displayValue.trim()) {
      this.clearRequiredValidity()
      if (this.mainInput.checkValidity()) {
        this.formSubmitted = false
      }
    }
    this.hourInput.value = this.hourInputValue
    this.minuteInput.value = this.minuteInputValue
    this.hourInput.min = minHour.toString()
    this.hourInput.max = maxHour.toString()

    const invalidSelection = this.hasSelectedTime && !this.isCurrentTimeValid()
    this.hourInput.classList.toggle('invalid', invalidSelection)
    this.minuteInput.classList.toggle('invalid', invalidSelection)

    this.dropdownContainer.hidden = !this.showDropdown || this.disabled
    this.hourDropdown.hidden = !this.showHourDropdown
    this.minuteDropdown.hidden = !this.showMinuteDropdown

    this.hourDropdown.querySelectorAll('.time_dropdown_option').forEach((el) => {
      const option = el as HTMLElement
      const h = parseInt(option.dataset.hour || '0', 10)
      option.classList.toggle('selected', h === this.hour)
    })

    this.minuteDropdown.querySelectorAll('.time_dropdown_option').forEach((el) => {
      const option = el as HTMLElement
      const m = parseInt(option.dataset.minute || '0', 10)
      option.classList.toggle('selected', m === this.minute)
    })

    if (this.rangeErrorContainer && this.rangeErrorText) {
      if (invalidSelection) {
        this.rangeErrorContainer.hidden = false
        const { minTime, maxTime } = (this.element as HTMLElement).dataset
        this.rangeErrorText.textContent = getTimeRangeErrorMessage(
          minTime,
          maxTime,
          this.timeFormat,
        )
      } else {
        this.rangeErrorContainer.hidden = true
      }
    }

    if (this.amRadio && this.pmRadio) {
      this.amRadio.checked = this.meridiem === 'AM'
      this.pmRadio.checked = this.meridiem === 'PM'
      const amValid = this.isAnyAMTimeValid()
      const pmValid = this.isAnyPMTimeValid()
      this.amRadio.disabled = !amValid
      this.pmRadio.disabled = !pmValid
      this.amCard?.classList.toggle('disabled_meridiem', !amValid)
      this.pmCard?.classList.toggle('disabled_meridiem', !pmValid)
    }

    const shouldShowValidationError = this.required && this.formSubmitted && !this.hasSelectedTime
    const errorDisplay = this.staticError
      || (shouldShowValidationError ? (this.validationMessage || 'Please fill out this field.') : '')

    this.element.classList.toggle('error', !!errorDisplay)
    this.mainInput.closest('.pb_text_input_kit')?.classList.toggle('error', !!errorDisplay)

    if (errorDisplay) {
      this.ensureValidationErrorMessage(errorDisplay)
    } else {
      this.removeValidationErrorMessage()
    }

  }

  private scrollHourDropdownToSelected(): void {
    if (!this.showHourDropdown) return
    requestAnimationFrame(() => this.scrollDropdownToSelected(this.hourDropdown))
  }

  private scrollMinuteDropdownToSelected(): void {
    if (!this.showMinuteDropdown) return
    requestAnimationFrame(() => this.scrollDropdownToSelected(this.minuteDropdown))
  }

  private bindEvents(): void {
    if (this.disabled) return

    const addOnCard = this.mainInput.closest('.text_input_wrapper_add_on')?.querySelector('.add-on-card') as HTMLElement
    if (addOnCard) {
      addOnCard.style.cursor = 'pointer'
      addOnCard.addEventListener('click', this.handleAddOnClick)
    }

    this.mainInput.addEventListener('click', this.handleInputClick)
    this.mainInput.addEventListener('focus', this.handleInputFocus)
    this.mainInput.addEventListener('keydown', this.handleInputKeyDown)

    if (this.required) {
      this.mainInput.addEventListener('change', this.handleMainInputChange)
    }

    this.hourInput.addEventListener('input', this.handleHourChange)
    this.hourInput.addEventListener('blur', this.handleHourBlur)
    this.hourInput.addEventListener('focus', this.handleHourFocus)
    this.hourInput.addEventListener('keydown', this.handleHourKeyDown)
    this.hourInput.addEventListener('click', this.handleHourInputClick)
    this.hourInput.addEventListener('wheel', this.handleHourInputWheel, { passive: false })

    this.minuteInput.addEventListener('input', this.handleMinuteChange)
    this.minuteInput.addEventListener('blur', this.handleMinuteBlur)
    this.minuteInput.addEventListener('focus', this.handleMinuteFocus)
    this.minuteInput.addEventListener('keydown', this.handleMinuteKeyDown)
    this.minuteInput.addEventListener('click', this.handleMinuteInputClick)
    this.minuteInput.addEventListener('wheel', this.handleMinuteInputWheel, { passive: false })

    this.amRadio?.addEventListener('change', this.handleAmRadioChange)
    this.pmRadio?.addEventListener('change', this.handlePmRadioChange)
    this.amRadio?.addEventListener('keydown', this.handleMeridiemKeyDownBound)
    this.pmRadio?.addEventListener('keydown', this.handleMeridiemKeyDownBound)
  }

  private unbindMainInputEvents(): void {
    const addOnCard = this.mainInput?.closest('.text_input_wrapper_add_on')?.querySelector('.add-on-card') as HTMLElement
    addOnCard?.removeEventListener('click', this.handleAddOnClick)
    this.mainInput?.removeEventListener('click', this.handleInputClick)
    this.mainInput?.removeEventListener('focus', this.handleInputFocus)
    this.mainInput?.removeEventListener('keydown', this.handleInputKeyDown)
    this.mainInput?.removeEventListener('change', this.handleMainInputChange)
  }

  private unbindDropdownInputEvents(): void {
    this.hourInput?.removeEventListener('input', this.handleHourChange)
    this.hourInput?.removeEventListener('blur', this.handleHourBlur)
    this.hourInput?.removeEventListener('focus', this.handleHourFocus)
    this.hourInput?.removeEventListener('keydown', this.handleHourKeyDown)
    this.hourInput?.removeEventListener('click', this.handleHourInputClick)
    this.hourInput?.removeEventListener('wheel', this.handleHourInputWheel)
    this.minuteInput?.removeEventListener('input', this.handleMinuteChange)
    this.minuteInput?.removeEventListener('blur', this.handleMinuteBlur)
    this.minuteInput?.removeEventListener('focus', this.handleMinuteFocus)
    this.minuteInput?.removeEventListener('keydown', this.handleMinuteKeyDown)
    this.minuteInput?.removeEventListener('click', this.handleMinuteInputClick)
    this.minuteInput?.removeEventListener('wheel', this.handleMinuteInputWheel)
    this.amRadio?.removeEventListener('change', this.handleAmRadioChange)
    this.pmRadio?.removeEventListener('change', this.handlePmRadioChange)
  }

  private handleAddOnClick = (e: Event): void => {
    e.preventDefault()
    e.stopPropagation()
    this.mainInput.focus()
    this.openDropdown()
  }

  private handleInputClick = (): void => {
    this.openDropdown()
  }

  private handleInputFocus = (): void => {
    this.openDropdown()
  }

  private handleMainInputChange = (): void => {
    if (this.mainInput.checkValidity()) {
      this.formSubmitted = false
    }
    this.updateUI()
  }

  private bindFormValidation(): void {
    if (!this.required || !this.formElement) return

    this.formElement.addEventListener('submit', this.handleFormSubmitBound, true)
  }

  private handleFormSubmit(): void {
    this.syncRequiredValidity()
  }

  private syncRequiredValidity(): void {
    if (!this.required) {
      this.mainInput.setCustomValidity('')
      return
    }

    const isEmpty = !this.hasSelectedTime || !this.mainInput.value.trim()

    if (isEmpty) {
      this.mainInput.setCustomValidity(
        this.validationMessage || 'Please fill out this field.',
      )
    } else {
      this.mainInput.setCustomValidity('')
    }
  }

  private clearRequiredValidity(): void {
    if (this.mainInput) {
      this.mainInput.setCustomValidity('')
    }
  }

  private ensureValidationErrorMessage(text: string): void {
    let errorBody = this.element.querySelector(VALIDATION_ERROR_SELECTOR) as HTMLElement | null
      || this.element.querySelector(`.text_input_wrapper ${VALIDATION_MESSAGE_CLASS}`) as HTMLElement | null

    if (!errorBody) {
      errorBody = document.createElement('div')
      errorBody.className = 'pb_body_kit pb_body_kit_negative'
      errorBody.dataset.pbTimePickerValidationError = 'true'
      errorBody.setAttribute('role', 'alert')
      errorBody.setAttribute('aria-live', 'polite')
      this.mainInput.closest('.text_input_wrapper')?.appendChild(errorBody)
    }

    errorBody.textContent = text
  }

  private removeValidationErrorMessage(): void {
    if (this.staticError) return

    this.element.querySelector(VALIDATION_ERROR_SELECTOR)?.remove()
  }

  private openDropdown(): void {
    this.showDropdown = true
    document.addEventListener('mousedown', this.handleClickOutsideBound)
    this.updateUI()
  }

  private closeDropdown(skipValidation = false): void {
    this.showHourDropdown = false
    this.showMinuteDropdown = false
    document.removeEventListener('mousedown', this.handleClickOutsideBound)

    if (!this.hasSelectedTime) {
      this.showDropdown = false
      this.updateUI()
      return
    }

    const currentTimeValid = skipValidation || this.isCurrentTimeValid()

    if (currentTimeValid) {
      const timeString = this.get24HourTimeString()
      this.displayValue = getDisplayTime(this.hour, this.minute, this.meridiem, this.timeFormat)
      this.lastValidTime = { hour: this.hour, minute: this.minute, meridiem: this.meridiem }
      this.showDropdown = false
      this.dispatchClose(timeString)
    } else if (this.lastValidTime) {
      this.hour = this.lastValidTime.hour
      this.minute = this.lastValidTime.minute
      this.meridiem = this.lastValidTime.meridiem
      this.hourInputValue = this.lastValidTime.hour.toString()
      this.minuteInputValue = this.lastValidTime.minute.toString().padStart(2, '0')
      this.displayValue = getDisplayTime(
        this.lastValidTime.hour,
        this.lastValidTime.minute,
        this.lastValidTime.meridiem,
        this.timeFormat,
      )
      this.showDropdown = false
    } else {
      const defaultState = parseTime(undefined, this.timeFormat)
      const validMeridiem = this.getValidInitialMeridiem(defaultState.meridiem)
      this.hour = defaultState.hour
      this.minute = defaultState.minute
      this.meridiem = validMeridiem
      this.hourInputValue = defaultState.hour.toString()
      this.minuteInputValue = defaultState.minute.toString().padStart(2, '0')
      this.displayValue = ''
      this.hasSelectedTime = false
      this.showDropdown = false
    }

    this.updateUI()
  }

  private clearTimePicker(): void {
    this.hasSelectedTime = false
    this.lastValidTime = null
    this.displayValue = ''
    const defaultState = parseTime(undefined, this.timeFormat)
    const validMeridiem = this.getValidInitialMeridiem(defaultState.meridiem)
    this.hour = defaultState.hour
    this.minute = defaultState.minute
    this.meridiem = validMeridiem
    this.hourInputValue = defaultState.hour.toString()
    this.minuteInputValue = defaultState.minute.toString().padStart(2, '0')
    this.dispatchChange('')
    this.updateUI()
  }

  private handleInvalid(event: Event): void {
    if (event.target !== this.mainInput) return

    this.formSubmitted = true
    this.updateUI()
  }

  private handleClickOutside(event: MouseEvent): void {
    if (!this.element.contains(event.target as Node)) {
      this.closeDropdown()
    }
  }

  private handleInputKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.closeDropdown()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      this.closeDropdown()
    } else if (e.key === 'Tab' && !e.shiftKey && this.showDropdown) {
      e.preventDefault()
      this.hourInput.focus()
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault()
      this.clearTimePicker()
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!this.showDropdown) this.openDropdown()
    } else if (e.key !== 'Tab') {
      e.preventDefault()
    }
  }

  private handleHourChange = (e: Event): void => {
    const rawValue = (e.target as HTMLInputElement).value
    const result = processHourInput(rawValue, this.timeFormat)
    if (!result.isValid) return
    this.hourInputValue = result.value
    if (result.hour !== null) {
      this.hour = result.hour
      this.hasSelectedTime = true
      this.dispatchChange(this.get24HourTimeString())
      this.updateUI()
    }
  }

  private handleHourFocus = (e: Event): void => {
    (e.target as HTMLInputElement).select()
  }

  private handleHourBlur = (): void => {
    const result = normalizeHourOnBlur(this.hourInputValue, this.hour, this.timeFormat)
    this.hour = result.hour
    this.hourInputValue = result.displayValue
    this.updateUI()
  }

  private handleHourInputWheel = (e: WheelEvent): void => {
    if (this.showHourDropdown) e.preventDefault()
  }

  private handleMinuteInputWheel = (e: WheelEvent): void => {
    if (this.showMinuteDropdown) e.preventDefault()
  }

  private handleHourInputClick = (): void => {
    const opening = !this.showHourDropdown
    this.showHourDropdown = opening
    this.showMinuteDropdown = false
    this.updateUI()
    if (opening) this.scrollHourDropdownToSelected()
  }

  private handleHourOptionClick(h: number): void {
    this.hour = h
    this.hourInputValue = h.toString()
    this.hasSelectedTime = true
    this.showHourDropdown = false
    this.dispatchChange(this.get24HourTimeString())
    this.updateUI()
  }

  private handleMinuteChange = (e: Event): void => {
    const rawValue = (e.target as HTMLInputElement).value
    const result = processMinuteInput(rawValue)
    if (!result.isValid) return
    this.minuteInputValue = result.value
    if (result.minute !== null) {
      this.minute = result.minute
      this.hasSelectedTime = true
      this.dispatchChange(this.get24HourTimeString())
      this.updateUI()
    }
  }

  private handleMinuteFocus = (e: Event): void => {
    (e.target as HTMLInputElement).select()
  }

  private handleMinuteBlur = (): void => {
    const result = normalizeMinuteOnBlur(this.minuteInputValue, this.minute)
    this.minute = result.minute
    this.minuteInputValue = result.displayValue
    this.updateUI()
  }

  private handleMinuteInputClick = (): void => {
    const opening = !this.showMinuteDropdown
    this.showMinuteDropdown = opening
    this.showHourDropdown = false
    this.updateUI()
    if (opening) this.scrollMinuteDropdownToSelected()
  }

  private handleMinuteOptionClick(m: number): void {
    this.minute = m
    this.minuteInputValue = m.toString().padStart(2, '0')
    this.hasSelectedTime = true
    this.showMinuteDropdown = false
    this.dispatchChange(this.get24HourTimeString())
    this.updateUI()
  }

  private handleMeridiemChange(mer: Meridiem): void {
    this.meridiem = mer
    this.hasSelectedTime = true
    this.dispatchChange(this.get24HourTimeString())
    this.updateUI()
  }

  private handleAmRadioChange = (): void => {
    if (this.amRadio?.checked) this.handleMeridiemChange('AM')
  }

  private handlePmRadioChange = (): void => {
    if (this.pmRadio?.checked) this.handleMeridiemChange('PM')
  }

  private handleHourKeyDown = (e: KeyboardEvent): void => {
    const { maxHour, minHour } = getHourConstraints(this.timeFormat)

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      this.showHourDropdown = false
      this.minuteInput.focus()
      this.updateUI()
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault()
      this.showHourDropdown = false
      this.closeDropdown()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newHour = this.hour >= maxHour ? minHour : this.hour + 1
      this.setHour(newHour)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newHour = this.hour <= minHour ? maxHour : this.hour - 1
      this.setHour(newHour)
    }
  }

  private setHour(newHour: number): void {
    this.hour = newHour
    this.hourInputValue = this.timeFormat === '24hour'
      ? newHour.toString().padStart(2, '0')
      : newHour.toString()
    this.hasSelectedTime = true
    this.dispatchChange(this.get24HourTimeString())
    this.updateUI()
    this.scrollHourDropdownToSelected()
  }

  private handleMinuteKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault()
      this.showMinuteDropdown = false
      this.hourInput.focus()
      this.updateUI()
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      this.showMinuteDropdown = false
      if (this.timeFormat === '24hour') {
        this.closeDropdown()
      } else if (this.meridiem === 'AM') {
        this.amRadio?.focus()
      } else {
        this.pmRadio?.focus()
      }
    } else if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault()
      this.showMinuteDropdown = false
      this.closeDropdown()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newMinute = this.minute >= 59 ? 0 : this.minute + 1
      this.setMinute(newMinute)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newMinute = this.minute <= 0 ? 59 : this.minute - 1
      this.setMinute(newMinute)
    }
  }

  private setMinute(newMinute: number): void {
    this.minute = newMinute
    this.minuteInputValue = newMinute.toString().padStart(2, '0')
    this.hasSelectedTime = true
    this.dispatchChange(this.get24HourTimeString())
    this.updateUI()
    this.scrollMinuteDropdownToSelected()
  }

  private handleMeridiemKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault()
      this.minuteInput.focus()
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault()
      this.closeDropdown()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (this.meridiem !== 'AM' && this.isAnyAMTimeValid()) {
        this.handleMeridiemChange('AM')
        this.amRadio?.focus()
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      if (this.meridiem !== 'PM' && this.isAnyPMTimeValid()) {
        this.handleMeridiemChange('PM')
        this.pmRadio?.focus()
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this.closeDropdown()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      this.closeDropdown()
    }
  }
}
