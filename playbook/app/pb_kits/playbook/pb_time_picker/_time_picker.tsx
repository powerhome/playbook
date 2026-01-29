import React, { useState, useEffect, useRef, useMemo } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import Caption from '../pb_caption/_caption'
import SelectableCard from '../pb_selectable_card/_selectable_card'
import TextInput from '../pb_text_input/_text_input'
import colors from '../tokens/exports/_colors.module.scss'

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
  convertTo24HourFormat,
  convertTo12HourFormat,
  generateHourOptions,
  generateMinuteOptions,
  getValidInitialMeridiem as getValidInitialMeridiemHelper,
  TimeFormat,
  ParsedTime,
} from './time_picker_helper'

type TimePickerProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  defaultTime?: string,
  disabled?: boolean,
  error?: string,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void) },
  id?: string,
  inputOptions?: { [key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void) },
  label?: string,
  maxTime?: string,
  minTime?: string,
  name?: string,
  onChange?: (time: string) => void,
  onClose?: (time: string) => void,
  required?: boolean,
  requiredIndicator?: boolean,
  showTimezone?: boolean,
  timeFormat?: TimeFormat,
  validationMessage?: string,
  value?: string,
} & GlobalProps

const TimePicker = (props: TimePickerProps): JSX.Element => {
  const {
    aria = {},
    className,
    data = {},
    defaultTime,
    disabled = false,
    error,
    htmlOptions = {},
    id,
    inputOptions = {},
    label = 'Time Picker',
    maxTime,
    minTime,
    name,
    onChange,
    onClose,
    required = false,
    requiredIndicator = false,
    showTimezone = false,
    timeFormat = 'AMPM',
    validationMessage,
    value,
  } = props

  // Form Validation Tracking for React Rendered Rails Kit
  const [formSubmitted, setFormSubmitted] = useState(false)

  const uniqueId = useMemo(() => {
    return id || `time-picker-${Math.random().toString(36).substr(2, 9)}`
  }, [id])

  const fieldName = name || `${uniqueId}-time`

  useEffect(() => {
    const handleInvalid = (event: Event) => {
      const target = event.target as HTMLInputElement
      const timePickerContainer = target.closest('[data-pb-react-component="TimePicker"]')

      if (timePickerContainer) {
        const invalidInputName = target.name || target.getAttribute('name')
        if (invalidInputName === fieldName) {
          setFormSubmitted(true)
        }
      }
    }
    document.addEventListener('invalid', handleInvalid, true)
    
    return () => {
      document.removeEventListener('invalid', handleInvalid, true)
    }
  }, [fieldName])

  // Min/Max Time Range Validation
  const minTimeMinutes = parseTimeToMinutes(minTime)
  const maxTimeMinutes = parseTimeToMinutes(maxTime)

  const isTimeInRange = (h: number, m: number, mer?: 'AM' | 'PM'): boolean => {
    return isTimeInRangeHelper(h, m, mer, timeFormat, minTimeMinutes, maxTimeMinutes)
  }

  const isCurrentTimeValid = (h: number, m: number, mer: 'AM' | 'PM'): boolean => {
    return isTimeInRange(h, m, mer)
  }

  const isAnyAMTimeValid = (): boolean => {
    return isAnyAMTimeValidHelper(minTimeMinutes, maxTimeMinutes)
  }

  const isAnyPMTimeValid = (): boolean => {
    return isAnyPMTimeValidHelper(minTimeMinutes, maxTimeMinutes)
  }

  // Wrapper for helper function with component's min/max context
  const getValidInitialMeridiem = (parsedMeridiem: 'AM' | 'PM'): 'AM' | 'PM' => {
    return getValidInitialMeridiemHelper(parsedMeridiem, minTimeMinutes, maxTimeMinutes)
  }

  const hasInitialValue = !!(value || defaultTime)
  const initialTime = parseTime(value || defaultTime, timeFormat)
  const validInitialMeridiem = getValidInitialMeridiem(initialTime.meridiem)
  const [hour, setHour] = useState(initialTime.hour)
  const [minute, setMinute] = useState(initialTime.minute)
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>(validInitialMeridiem)
  const [hasSelectedTime, setHasSelectedTime] = useState(hasInitialValue)
  const [hourInputValue, setHourInputValue] = useState<string>(initialTime.hour.toString())
  const [minuteInputValue, setMinuteInputValue] = useState<string>(initialTime.minute.toString().padStart(2, '0'))
  
  // Update hour input value format based on timeFormat changes
  const prevTimeFormatRef = useRef(timeFormat)
  const isInitialMountRef = useRef(true)
  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      prevTimeFormatRef.current = timeFormat
      return
    }
    
    if (prevTimeFormatRef.current === timeFormat) return
    prevTimeFormatRef.current = timeFormat

    if (timeFormat === '24hour') {
      const result = convertTo24HourFormat(hour, meridiem)
      setHour(result.hour)
      setHourInputValue(result.hour.toString())
      if (result.meridiem !== meridiem) {
        setMeridiem(result.meridiem)
      }
    } else {
      const result = convertTo12HourFormat(hour, meridiem)
      setHour(result.hour)
      setHourInputValue(result.hour.toString())
      if (result.meridiem !== meridiem) {
        setMeridiem(result.meridiem)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFormat])

  const hourInputRef = useRef<HTMLInputElement>(null)
  const minuteInputRef = useRef<HTMLInputElement>(null)
  const amInputRef = useRef<HTMLInputElement | null>(null)
  const pmInputRef = useRef<HTMLInputElement | null>(null)
  const timePickerWrapperRef = useRef<HTMLDivElement>(null)
  const hourDropdownRef = useRef<HTMLDivElement>(null)
  const minuteDropdownRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showHourDropdown, setShowHourDropdown] = useState(false)
  const [showMinuteDropdown, setShowMinuteDropdown] = useState(false)

  // Clicking the clock add-on opens the dropdown
  useEffect(() => {
    if (disabled) return

    const addOnCard = document.querySelector(`#${uniqueId}-input`)?.closest('.text_input_wrapper_add_on')?.querySelector('.add-on-card') as HTMLElement
    
    if (addOnCard) {
      const handleAddOnClick = (e: Event) => {
        e.preventDefault()
        e.stopPropagation()
        setShowDropdown(true)
      }
      
      addOnCard.addEventListener('click', handleAddOnClick)
      addOnCard.style.cursor = 'pointer'
      
      return () => {
        addOnCard.removeEventListener('click', handleAddOnClick)
      }
    }
  }, [uniqueId, disabled, setShowDropdown])

  // Input dropdown scrolling
  const scrollDropdownToSelected = (dropdownRef: React.RefObject<HTMLDivElement>) => {
    if (dropdownRef.current) {
      const selectedOption = dropdownRef.current.querySelector('.selected') as HTMLElement
      if (selectedOption) {
        const dropdown = dropdownRef.current
        const dropdownHeight = dropdown.clientHeight
        const optionTop = selectedOption.offsetTop
        const optionHeight = selectedOption.clientHeight
        // Center the selected option in the dropdown
        dropdown.scrollTop = optionTop - (dropdownHeight / 2) + (optionHeight / 2)
      }
    }
  }

  useEffect(() => {
    if (showHourDropdown) {
      scrollDropdownToSelected(hourDropdownRef)
    }
  }, [showHourDropdown])

  useEffect(() => {
    if (showMinuteDropdown) {
      scrollDropdownToSelected(minuteDropdownRef)
    }
  }, [showMinuteDropdown])

  useEffect(() => {
    if (showHourDropdown) {
      setTimeout(() => scrollDropdownToSelected(hourDropdownRef), 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour])

  useEffect(() => {
    if (showMinuteDropdown) {
      setTimeout(() => scrollDropdownToSelected(minuteDropdownRef), 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minute])
  
  const [displayValue, setDisplayValue] = useState(
    hasInitialValue ? getDisplayTime(hour, minute, meridiem, timeFormat) : ''
  )
  
  // Clearing Input and Validation Code
  // Track the last valid time for reverting invalid selections
  const [lastValidTime, setLastValidTime] = useState<ParsedTime | null>(
    hasInitialValue && isTimeInRange(initialTime.hour, initialTime.minute, initialTime.meridiem) 
      ? initialTime 
      : null
  )

  // Clear the time picker value completely
  const clearTimePicker = () => {
    setHasSelectedTime(false)
    setLastValidTime(null)
    setDisplayValue('')
    const defaultState = parseTime(undefined, timeFormat)
    const validMeridiem = getValidInitialMeridiem(defaultState.meridiem)
    setHour(defaultState.hour)
    setMinute(defaultState.minute)
    setMeridiem(validMeridiem)
    setHourInputValue(defaultState.hour.toString())
    setMinuteInputValue(defaultState.minute.toString().padStart(2, '0'))
    if (onChange) {
      onChange('')
    }
  }

  // Close dropdown and handle validation
  const closeDropdown = (skipValidation = false) => {
    setShowHourDropdown(false)
    setShowMinuteDropdown(false)

    // If user hasn't selected anything, just close the dropdown
    if (!hasSelectedTime) {
      setShowDropdown(false)
      return
    }

    const currentTimeValid = skipValidation || isCurrentTimeValid(hour, minute, meridiem)
    
    if (currentTimeValid) {
      // Valid time - save it
      const timeString = get24HourTime(hour, minute, meridiem, timeFormat)
      setDisplayValue(getDisplayTime(hour, minute, meridiem, timeFormat))
      setLastValidTime({ hour, minute, meridiem })
      setShowDropdown(false)
      if (onClose) {
        onClose(timeString)
      }
    } else {
      // Invalid time - revert to last valid time or reset to defaults
      if (lastValidTime) {
        setHour(lastValidTime.hour)
        setMinute(lastValidTime.minute)
        setMeridiem(lastValidTime.meridiem)
        setHourInputValue(lastValidTime.hour.toString())
        setMinuteInputValue(lastValidTime.minute.toString().padStart(2, '0'))
        setDisplayValue(getDisplayTime(lastValidTime.hour, lastValidTime.minute, lastValidTime.meridiem, timeFormat))
      } else {
        // No valid time ever selected - reset to default state
        const defaultState = parseTime(undefined, timeFormat)
        const validMeridiem = getValidInitialMeridiem(defaultState.meridiem)
        setHour(defaultState.hour)
        setMinute(defaultState.minute)
        setMeridiem(validMeridiem)
        setHourInputValue(defaultState.hour.toString())
        setMinuteInputValue(defaultState.minute.toString().padStart(2, '0'))
        setDisplayValue('')
        setHasSelectedTime(false)
      }
      setShowDropdown(false)
    }
  }

  // Handle controlled component updates
  useEffect(() => {
    if (value !== undefined) {
      const parsed = parseTime(value, timeFormat)
      setHour(parsed.hour)
      setMinute(parsed.minute)
      setMeridiem(parsed.meridiem)
      setHourInputValue(parsed.hour.toString())
      setMinuteInputValue(parsed.minute.toString().padStart(2, '0'))
      setDisplayValue(getDisplayTime(parsed.hour, parsed.minute, parsed.meridiem, timeFormat))
      setHasSelectedTime(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  
  // Re-parse when timeFormat changes if we have a defaultTime
  const prevTimeFormatRef3 = useRef(timeFormat)
  const isInitialMountRef3 = useRef(true)
  useEffect(() => {
    if (isInitialMountRef3.current) {
      isInitialMountRef3.current = false
      prevTimeFormatRef3.current = timeFormat
      return
    }
    
    if (prevTimeFormatRef3.current === timeFormat) return
    prevTimeFormatRef3.current = timeFormat
    
    if (defaultTime && !value) {
      const parsed = parseTime(defaultTime, timeFormat)
      setHour(parsed.hour)
      setMinute(parsed.minute)
      setMeridiem(parsed.meridiem)
      setHourInputValue(parsed.hour.toString())
      setMinuteInputValue(parsed.minute.toString().padStart(2, '0'))
      setDisplayValue(getDisplayTime(parsed.hour, parsed.minute, parsed.meridiem, timeFormat))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFormat])
  
  useEffect(() => {
    if (hasSelectedTime) {
      setDisplayValue(getDisplayTime(hour, minute, meridiem, timeFormat))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, meridiem, hasSelectedTime, timeFormat])

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const result = processHourInput(rawValue, timeFormat)
    
    if (!result.isValid) return
    
    setHourInputValue(result.value)
    
    if (result.hour !== null) {
      setHour(result.hour)
      setHasSelectedTime(true)
      const timeString = get24HourTime(result.hour, minute, meridiem, timeFormat)
      if (onChange) {
        onChange(timeString)
      }
    }
  }

  const handleHourFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const handleHourBlur = () => {
    const result = normalizeHourOnBlur(hourInputValue, hour, timeFormat)
    setHour(result.hour)
    setHourInputValue(result.displayValue)
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const result = processMinuteInput(rawValue)
    
    if (!result.isValid) return
    
    setMinuteInputValue(result.value)
    
    if (result.minute !== null) {
      setMinute(result.minute)
      setHasSelectedTime(true)
      const timeString = get24HourTime(hour, result.minute, meridiem, timeFormat)
      if (onChange) {
        onChange(timeString)
      }
    }
  }

  const handleMinuteFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const handleMinuteBlur = () => {
    const result = normalizeMinuteOnBlur(minuteInputValue, minute)
    setMinute(result.minute)
    setMinuteInputValue(result.displayValue)
  }

  const handleHourOptionClick = (h: number) => {
    setHour(h)
    setHourInputValue(h.toString())
    setHasSelectedTime(true)
    setShowHourDropdown(false)
    const timeString = get24HourTime(h, minute, meridiem, timeFormat)
    if (onChange) {
      onChange(timeString)
    }
  }

  const handleMinuteOptionClick = (m: number) => {
    setMinute(m)
    setMinuteInputValue(m.toString().padStart(2, '0'))
    setHasSelectedTime(true)
    setShowMinuteDropdown(false)
    const timeString = get24HourTime(hour, m, meridiem, timeFormat)
    if (onChange) {
      onChange(timeString)
    }
  }

  const handleMeridiemChange = (mer: 'AM' | 'PM') => {
    setMeridiem(mer)
    setHasSelectedTime(true)
    const timeString = get24HourTime(hour, minute, mer, timeFormat)
    if (onChange) {
      onChange(timeString)
    }
  }
  
  const handleInputClick = () => {
    setShowDropdown(true)
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      closeDropdown()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      closeDropdown()
    } else if (e.key === 'Tab' && !e.shiftKey && showDropdown) {
      e.preventDefault()
      hourInputRef.current?.focus()
    } else if (e.key === 'Tab' && e.shiftKey) {
      // Allow shift+tab to go to previous element
      return
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      // Allow clearing the input
      e.preventDefault()
      clearTimePicker()
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Open dropdown on arrow keys
      e.preventDefault()
      if (!showDropdown) {
        setShowDropdown(true)
      }
    } else {
      // Prevent typing in main input - alternative to readonly that allows for validation to occur
      e.preventDefault()
    }
  }

  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      if (!e.shiftKey) {
        e.preventDefault()
        setShowHourDropdown(false)
        minuteInputRef.current?.focus()
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      setShowHourDropdown(false)
      closeDropdown()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowHourDropdown(false)
      closeDropdown()
    } else if (e.key === 'ArrowDown') {
      // ArrowDown increases value (like scrolling down a list)
      e.preventDefault()
      const { maxHour, minHour } = getHourConstraints(timeFormat)
      const newHour = hour >= maxHour ? minHour : hour + 1
      setHour(newHour)
      setHourInputValue(timeFormat === '24hour' ? newHour.toString().padStart(2, '0') : newHour.toString())
      setHasSelectedTime(true)
      const timeString = get24HourTime(newHour, minute, meridiem, timeFormat)
      if (onChange) {
        onChange(timeString)
      }
    } else if (e.key === 'ArrowUp') {
      // ArrowUp decreases value (like scrolling up a list)
      e.preventDefault()
      const { maxHour, minHour } = getHourConstraints(timeFormat)
      const newHour = hour <= minHour ? maxHour : hour - 1
      setHour(newHour)
      setHourInputValue(timeFormat === '24hour' ? newHour.toString().padStart(2, '0') : newHour.toString())
      setHasSelectedTime(true)
      const timeString = get24HourTime(newHour, minute, meridiem, timeFormat)
      if (onChange) {
        onChange(timeString)
      }
    }
  }

  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault()
      setShowMinuteDropdown(false)
      hourInputRef.current?.focus()
    } else if (e.key === 'Tab') {
      if (!e.shiftKey) {
        e.preventDefault()
        setShowMinuteDropdown(false)
        if (timeFormat === '24hour') {
          closeDropdown()
        } else {
          // Tab to the currently selected meridiem
          if (meridiem === 'AM') {
            amInputRef.current?.focus()
          } else {
            pmInputRef.current?.focus()
          }
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      setShowMinuteDropdown(false)
      closeDropdown()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowMinuteDropdown(false)
      closeDropdown()
    } else if (e.key === 'ArrowDown') {
      // ArrowDown increases value (like scrolling down a list)
      e.preventDefault()
      const newMinute = minute >= 59 ? 0 : minute + 1
      setMinute(newMinute)
      setMinuteInputValue(newMinute.toString().padStart(2, '0'))
      setHasSelectedTime(true)
      const timeString = get24HourTime(hour, newMinute, meridiem, timeFormat)
      if (onChange) {
        onChange(timeString)
      }
    } else if (e.key === 'ArrowUp') {
      // ArrowUp decreases value (like scrolling up a list)
      e.preventDefault()
      const newMinute = minute <= 0 ? 59 : minute - 1
      setMinute(newMinute)
      setMinuteInputValue(newMinute.toString().padStart(2, '0'))
      setHasSelectedTime(true)
      const timeString = get24HourTime(hour, newMinute, meridiem, timeFormat)
      if (onChange) {
        onChange(timeString)
      }
    }
  }

  // Shared handler for AM/PM - arrow keys toggle between them
  const handleMeridiemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault()
      minuteInputRef.current?.focus()
    } else if (e.key === 'Tab' && !e.shiftKey) {
      // Tab out of the component - let it close
      e.preventDefault()
      closeDropdown()
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      // Toggle to AM and focus it
      if (meridiem !== 'AM' && isAnyAMTimeValid()) {
        handleMeridiemChange('AM')
        amInputRef.current?.focus()
      }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      // Toggle to PM and focus it
      if (meridiem !== 'PM' && isAnyPMTimeValid()) {
        handleMeridiemChange('PM')
        pmInputRef.current?.focus()
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      // Enter or Space confirms selection and closes
      e.preventDefault()
      closeDropdown()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      closeDropdown()
    }
  }

  // Set up keyboard handlers for AM/PM inputs
  useEffect(() => {
    if (showDropdown && timeFormat === 'AMPM') {
      const amInput = document.getElementById(`${uniqueId}-am`) as HTMLInputElement
      const pmInput = document.getElementById(`${uniqueId}-pm`) as HTMLInputElement
      
      const handleKeyDownEvent = (e: KeyboardEvent) => {
        const reactEvent = e as unknown as React.KeyboardEvent<HTMLInputElement>
        handleMeridiemKeyDown(reactEvent)
      }

      if (amInput) {
        (amInputRef as React.MutableRefObject<HTMLInputElement | null>).current = amInput
        amInput.addEventListener('keydown', handleKeyDownEvent)
      }
      
      if (pmInput) {
        (pmInputRef as React.MutableRefObject<HTMLInputElement | null>).current = pmInput
        pmInput.addEventListener('keydown', handleKeyDownEvent)
      }
      
      return () => {
        if (amInput) amInput.removeEventListener('keydown', handleKeyDownEvent)
        if (pmInput) pmInput.removeEventListener('keydown', handleKeyDownEvent)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDropdown, timeFormat, uniqueId, meridiem])
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerWrapperRef.current && !timePickerWrapperRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDropdown, hour, minute, meridiem, onClose, lastValidTime, minTime, maxTime])

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const inputHtmlProps = buildHtmlProps(inputOptions)

  const shouldShowValidationError = required && formSubmitted && !hasSelectedTime
  const errorDisplay = error || (shouldShowValidationError ? (validationMessage || "Please fill out this field.") : "")

  const classes = classnames(
    buildCss('pb_time_picker'),
    globalProps(props),
    errorDisplay ? 'error' : null,
    disabled ? 'disabled' : null,
    className
  )

  // Get hour constraints for the input
  const { maxHour, minHour } = getHourConstraints(timeFormat)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={uniqueId}
        ref={timePickerWrapperRef}
        style={{ position: 'relative' }}
    >
      {label && (
        <label htmlFor={`${uniqueId}-input`}>
          {requiredIndicator ? (
            <Caption
                className="pb_time_picker_kit_label"
                marginBottom="xs"
                size="md"
            >
              {label} <span style={{ color: `${colors.error}` }}>{'*'}</span>
            </Caption>
          ) : (
            <Caption
                className="pb_time_picker_kit_label"
                marginBottom="xs"
                size="md"
                text={label}
            />
          )}
        </label>
      )}
      <div className="time_picker_wrapper">
        <TextInput
            addOn={{ icon: 'clock', alignment: 'right', border: true }}
            cursor="pointer"
            disabled={disabled}
            error={errorDisplay}
            id={`${uniqueId}-input`}
            label=""
            name={fieldName}
            onClick={disabled ? undefined : handleInputClick}
            onFocus={disabled ? undefined : handleInputFocus}
            placeholder="Select Time"
            required={required}
            type="text"
            value={displayValue}
        >
          <input
              autoComplete="off"
              disabled={disabled}
              id={`${uniqueId}-input`}
              name={fieldName}
              onChange={() => { /* onChange handled via dropdown selection */ }}
              onClick={disabled ? undefined : handleInputClick}
              onFocus={disabled ? undefined : handleInputFocus}
              onKeyDown={disabled ? undefined : handleInputKeyDown}
              placeholder="Select Time"
              required={required}
              style={{ caretColor: 'transparent' }}
              type="text"
              value={displayValue}
              {...inputHtmlProps}
          />
        </TextInput>
        
        {showDropdown && !disabled && (
          <div className={`pb_time_picker_container ${timeFormat === '24hour' ? 'pb_time_picker_container_24hour' : ''}`}>
            <div className="pb_time_selection">
              <div className="time_input_wrapper">
                <label htmlFor={`${uniqueId}-hour`}>
                  <Caption
                      className="time_input_label"
                      size="sm"
                      text="Hour"
                  />
                </label>
                <input
                    className={`time_input time-hour ${hasSelectedTime && !isCurrentTimeValid(hour, minute, meridiem) ? 'invalid' : ''}`}
                    id={`${uniqueId}-hour`}
                    inputMode="numeric"
                    max={maxHour}
                    maxLength={2}
                    min={minHour}
                    name={`${uniqueId}-hour`}
                    onBlur={handleHourBlur}
                    onChange={handleHourChange}
                    onClick={() => { setShowHourDropdown(!showHourDropdown); setShowMinuteDropdown(false) }}
                    onFocus={handleHourFocus}
                    onKeyDown={handleHourKeyDown}
                    pattern="[0-9]*"
                    ref={hourInputRef}
                    step={1}
                    tabIndex={0}
                    type="number"
                    value={hourInputValue}
                />
                {showHourDropdown && (
                  <div 
                      className="time_dropdown"
                      ref={hourDropdownRef}
                  >
                    {generateHourOptions(timeFormat).map((h) => (
                      <div
                          className={`time_dropdown_option ${hour === h ? 'selected' : ''}`}
                          key={h}
                          onClick={() => handleHourOptionClick(h)}
                      >
                        {timeFormat === '24hour' ? h.toString().padStart(2, '0') : h}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className="time-separator">{':'}</span>
              <div className="time_input_wrapper">
                <label htmlFor={`${uniqueId}-minute`}>
                  <Caption
                      className="time_input_label"
                      size="sm"
                      text="Minute"
                  />
                </label>
                <input
                    className={`time_input time-minute ${hasSelectedTime && !isCurrentTimeValid(hour, minute, meridiem) ? 'invalid' : ''}`}
                    id={`${uniqueId}-minute`}
                    inputMode="numeric"
                    max={59}
                    maxLength={2}
                    min={0}
                    name={`${uniqueId}-minute`}
                    onBlur={handleMinuteBlur}
                    onChange={handleMinuteChange}
                    onClick={() => { setShowMinuteDropdown(!showMinuteDropdown); setShowHourDropdown(false) }}
                    onFocus={handleMinuteFocus}
                    onKeyDown={handleMinuteKeyDown}
                    pattern="[0-9]*"
                    ref={minuteInputRef}
                    step={1}
                    tabIndex={0}
                    type="number"
                    value={minuteInputValue}
                />
                {showMinuteDropdown && (
                  <div 
                      className="time_dropdown"
                      ref={minuteDropdownRef}
                  >
                    {generateMinuteOptions().map((m) => (
                      <div
                          className={`time_dropdown_option ${minute === m ? 'selected' : ''}`}
                          key={m}
                          onClick={() => handleMinuteOptionClick(m)}
                      >
                        {m.toString().padStart(2, '0')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {timeFormat === 'AMPM' && (
                <div className="meridiem">
                  <Caption
                      className="time_input_label"
                      size="sm"
                      text="Period"
                  />
                  <div className="pb_form_group_kit">
                    <SelectableCard
                        checked={meridiem === 'AM'}
                        className={!isAnyAMTimeValid() ? 'disabled_meridiem' : ''}
                        disabled={!isAnyAMTimeValid()}
                        inputId={`${uniqueId}-am`}
                        multi={false}
                        name={`${uniqueId}-meridiem`}
                        onChange={() => handleMeridiemChange('AM')}
                        text="AM"
                        value="AM"
                    />
                    <SelectableCard
                        checked={meridiem === 'PM'}
                        className={!isAnyPMTimeValid() ? 'disabled_meridiem' : ''}
                        disabled={!isAnyPMTimeValid()}
                        inputId={`${uniqueId}-pm`}
                        multi={false}
                        name={`${uniqueId}-meridiem`}
                        onChange={() => handleMeridiemChange('PM')}
                        text="PM"
                        value="PM"
                    />
                  </div>
                </div>
              )}
              {/* Show validation error in dropdownwhen time is out of range */}
              {hasSelectedTime && !isCurrentTimeValid(hour, minute, meridiem) && (
                <div className="time_range_error">
                  <Caption
                      className="time_range_error_text"
                      marginTop="sm"
                      size="xs"
                      text={getTimeRangeErrorMessage(minTime, maxTime, timeFormat)}
                  />
                </div>
              )}
              {showTimezone && (
                <Caption
                    lineHeight="tight"
                    marginTop="sm"
                    size="xs"
                    text={getTimezoneText()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimePicker
