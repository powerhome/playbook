
import React, { useState, useEffect, useRef, useMemo } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import Caption from '../pb_caption/_caption'
import SelectableCard from '../pb_selectable_card/_selectable_card'
import TextInput from '../pb_text_input/_text_input'

type TimePickerProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  defaultTime?: string, // Format: "HH:MM" (24-hour) or "H:MM AM/PM" (12-hour)
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void) },
  id?: string,
  label?: string,
  onChange?: (time: string) => void, // Returns time in "HH:MM" format (24-hour)
  onClose?: (time: string) => void, // Returns time in "HH:MM" format (24-hour) when dropdown closes
  showTimezone?: boolean,
  timeFormat?: 'AMPM' | '24hour', // Time format: "AMPM" (12-hour) or "24hour" (24-hour)
  value?: string, // Controlled component value
} & GlobalProps

const TimePicker = (props: TimePickerProps): JSX.Element => {
  const {
    aria = {},
    className,
    data = {},
    defaultTime,
    htmlOptions = {},
    id,
    label = 'Time Picker',
    onChange,
    onClose,
    showTimezone = false,
    timeFormat = 'AMPM',
    value,
  } = props

  // Parse initial time
  const parseTime = (timeStr: string | undefined): { hour: number, minute: number, meridiem: 'AM' | 'PM' } => {
    if (!timeStr) {
      // Default to 12:00 PM when no time is provided
      if (timeFormat === '24hour') {
        return {
          hour: 12,
          minute: 0,
          meridiem: 'PM',
        }
      }
      return {
        hour: 12,
        minute: 0,
        meridiem: 'PM',
      }
    }

    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i)
    if (match) {
      let hour = parseInt(match[1], 10)
      const minute = parseInt(match[2], 10)
      let meridiem = match[3]?.toUpperCase() as 'AM' | 'PM'

      if (timeFormat === '24hour') {
        // For 24-hour format, store hour as-is (0-23) but keep meridiem for internal state
        // If meridiem is provided, convert to 24-hour first
        if (meridiem) {
          if (meridiem === 'PM' && hour !== 12) hour += 12
          if (meridiem === 'AM' && hour === 12) hour = 0
        }
        if (hour > 23) hour = 23
        if (hour < 0) hour = 0
        meridiem = hour < 12 ? 'AM' : 'PM'
        return { hour, minute, meridiem }
      }

      // 12-hour format (AMPM)
      // If no meridiem specified, infer from hour (assuming 24-hour format input)
      if (!meridiem) {
        // Input is likely 24-hour format, convert to 12-hour
        if (hour > 12) {
          hour = hour % 12
          meridiem = 'PM'
        } else if (hour === 12) {
          meridiem = 'PM'
        } else if (hour === 0) {
          hour = 12
          meridiem = 'AM'
        } else {
          meridiem = 'AM'
        }
      }
      // If meridiem is provided, keep hour in 12-hour format (1-12) as-is
      // No conversion needed - the input is already in 12-hour format

      return { hour, minute, meridiem }
    }

    return { hour: timeFormat === '24hour' ? 12 : 12, minute: 0, meridiem: 'PM' }
  }

  const hasInitialValue = !!(value || defaultTime)
  const initialTime = parseTime(value || defaultTime)
  const [hour, setHour] = useState(initialTime.hour)
  const [minute, setMinute] = useState(initialTime.minute)
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>(initialTime.meridiem)
  const [hasSelectedTime, setHasSelectedTime] = useState(hasInitialValue)
  const [hourInputValue, setHourInputValue] = useState<string>(initialTime.hour.toString())
  const [minuteInputValue, setMinuteInputValue] = useState<string>(initialTime.minute.toString().padStart(2, '0'))
  
  // Update hour input value format based on timeFormat changes
  // Only run this if timeFormat actually changes, not on initial mount
  const prevTimeFormatRef = useRef(timeFormat)
  const isInitialMountRef = useRef(true)
  useEffect(() => {
    // Skip on initial mount - the parseTime function already handles the correct format
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      prevTimeFormatRef.current = timeFormat
      return
    }
    
    // Only convert if timeFormat actually changed
    if (prevTimeFormatRef.current === timeFormat) return
    prevTimeFormatRef.current = timeFormat

    if (timeFormat === '24hour') {
      // Convert from 12-hour to 24-hour if needed
      let hour24 = hour
      if (meridiem === 'PM' && hour !== 12) hour24 = hour + 12
      if (meridiem === 'AM' && hour === 12) hour24 = 0
      if (hour24 > 23) hour24 = 23
      if (hour24 < 0) hour24 = 0
      setHour(hour24)
      setHourInputValue(hour24.toString())
    } else {
      // Convert from 24-hour to 12-hour if needed
      // Only convert if hour is > 12 (definitely 24-hour format)
      // Don't overwrite meridiem if hour is 1-12 (could be either format)
      let hour12 = hour
      let shouldUpdateMeridiem = false
      if (hour12 > 12) {
        hour12 = hour12 % 12
        shouldUpdateMeridiem = true
        setMeridiem('PM')
      } else if (hour12 === 0) {
        hour12 = 12
        shouldUpdateMeridiem = true
        setMeridiem('AM')
      } else if (hour12 === 12 && prevTimeFormatRef.current === '24hour') {
        // Only set to PM if we're converting from 24-hour format
        shouldUpdateMeridiem = true
        setMeridiem('PM')
      }
      // Don't change meridiem for hours 1-11 - preserve what was parsed
      if (hour12 > 12) hour12 = 12
      if (hour12 < 1) hour12 = 1
      setHour(hour12)
      setHourInputValue(hour12.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFormat])

  const hourInputRef = useRef<HTMLInputElement>(null)
  const minuteInputRef = useRef<HTMLInputElement>(null)
  const amInputRef = useRef<HTMLInputElement | null>(null)
  const pmInputRef = useRef<HTMLInputElement | null>(null)
  const timePickerWrapperRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Generate a unique ID for this component instance if one isn't provided
  const uniqueId = useMemo(() => {
    return id || `time-picker-${Math.random().toString(36).substr(2, 9)}`
  }, [id])
  
  // Format time for display in input
  const getDisplayTime = (h: number, m: number, mer: 'AM' | 'PM'): string => {
    if (timeFormat === '24hour') {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    }
    return `${h}:${m.toString().padStart(2, '0')} ${mer}`
  }
  
  const [displayValue, setDisplayValue] = useState(hasInitialValue ? getDisplayTime(hour, minute, meridiem) : '')

  // Convert to 24-hour format for onChange callback
  const get24HourTime = (h: number, m: number, mer: 'AM' | 'PM'): string => {
    if (timeFormat === '24hour') {
      // Already in 24-hour format
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    }
    // Convert from 12-hour to 24-hour
    let hour24 = h
    if (mer === 'PM' && h !== 12) hour24 = h + 12
    if (mer === 'AM' && h === 12) hour24 = 0
    return `${hour24.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }

  // Handle controlled component updates
  useEffect(() => {
    if (value !== undefined) {
      const parsed = parseTime(value)
      setHour(parsed.hour)
      setMinute(parsed.minute)
      setMeridiem(parsed.meridiem)
      setHourInputValue(parsed.hour.toString())
      setMinuteInputValue(parsed.minute.toString().padStart(2, '0'))
      setDisplayValue(getDisplayTime(parsed.hour, parsed.minute, parsed.meridiem))
      setHasSelectedTime(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  
  // Re-parse when timeFormat changes if we have a defaultTime
  const prevTimeFormatRef3 = useRef(timeFormat)
  const isInitialMountRef3 = useRef(true)
  useEffect(() => {
    // Skip on initial mount - the parseTime function already handles the correct format
    if (isInitialMountRef3.current) {
      isInitialMountRef3.current = false
      prevTimeFormatRef3.current = timeFormat
      return
    }
    
    // Only re-parse if timeFormat actually changed
    if (prevTimeFormatRef3.current === timeFormat) return
    prevTimeFormatRef3.current = timeFormat
    
    // Re-parse defaultTime when timeFormat changes
    if (defaultTime && !value) {
      const parsed = parseTime(defaultTime)
      setHour(parsed.hour)
      setMinute(parsed.minute)
      setMeridiem(parsed.meridiem)
      setHourInputValue(parsed.hour.toString())
      setMinuteInputValue(parsed.minute.toString().padStart(2, '0'))
      setDisplayValue(getDisplayTime(parsed.hour, parsed.minute, parsed.meridiem))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFormat])
  
  // Update hour input value format based on timeFormat changes
  // Only run this if timeFormat actually changes, not on initial mount
  const prevTimeFormatRef2 = useRef(timeFormat)
  const isInitialMountRef2 = useRef(true)
  useEffect(() => {
    // Skip on initial mount - the parseTime function already handles the correct format
    if (isInitialMountRef2.current) {
      isInitialMountRef2.current = false
      prevTimeFormatRef2.current = timeFormat
      return
    }
    
    // Only convert if timeFormat actually changed
    if (prevTimeFormatRef2.current === timeFormat) return
    prevTimeFormatRef2.current = timeFormat
    
    // Only convert if we have a valid time selected
    if (!hasSelectedTime) return
    
    if (timeFormat === '24hour') {
      // Convert from 12-hour to 24-hour if needed
      let hour24 = hour
      if (meridiem === 'PM' && hour !== 12) hour24 = hour + 12
      if (meridiem === 'AM' && hour === 12) hour24 = 0
      if (hour24 > 23) hour24 = 23
      if (hour24 < 0) hour24 = 0
      if (hour24 !== hour) {
        setHour(hour24)
        setHourInputValue(hour24.toString())
      }
    } else {
      // Convert from 24-hour to 12-hour if needed
      // Only convert if hour is > 12 (definitely 24-hour format)
      // Don't overwrite meridiem if hour is 1-12 (could be either format)
      let hour12 = hour
      let newMeridiem = meridiem
      let shouldUpdateMeridiem = false
      if (hour12 > 12) {
        hour12 = hour12 % 12
        newMeridiem = 'PM'
        shouldUpdateMeridiem = true
      } else if (hour12 === 0) {
        hour12 = 12
        newMeridiem = 'AM'
        shouldUpdateMeridiem = true
      } else if (hour12 === 12 && prevTimeFormatRef2.current === '24hour') {
        // Only set to PM if we're converting from 24-hour format
        newMeridiem = 'PM'
        shouldUpdateMeridiem = true
      }
      // Don't change meridiem for hours 1-11 - preserve what was parsed
      if (hour12 > 12) hour12 = 12
      if (hour12 < 1) hour12 = 1
      if (hour12 !== hour || (shouldUpdateMeridiem && newMeridiem !== meridiem)) {
        setHour(hour12)
        setHourInputValue(hour12.toString())
        if (shouldUpdateMeridiem) {
          setMeridiem(newMeridiem)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFormat])
  
  // Update display value when time changes (only if time has been selected)
  useEffect(() => {
    if (hasSelectedTime) {
      setDisplayValue(getDisplayTime(hour, minute, meridiem))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, meridiem, hasSelectedTime, timeFormat])

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Allow empty for deletion
    if (inputValue === '') {
      setHourInputValue('')
      return
    }
    
    // Validate input as user types
    const numValue = parseInt(inputValue, 10)
    if (isNaN(numValue)) {
      return // Don't update if not a number
    }
    
    const maxHour = timeFormat === '24hour' ? 23 : 12
    const minHour = timeFormat === '24hour' ? 0 : 1
    
    // Prevent values greater than max
    if (numValue > maxHour) {
      // If they're typing a second digit that makes it > max, cap at max
      if (inputValue.length === 2) {
        if (timeFormat === '24hour' && inputValue.startsWith('2')) {
          // They typed "2" then something > 3, cap at 23
          setHourInputValue('23')
          setHour(23)
          setHasSelectedTime(true)
          const timeString = get24HourTime(23, minute, meridiem)
          if (onChange) {
            onChange(timeString)
          }
          return
        } else if (timeFormat === 'AMPM' && inputValue.startsWith('1')) {
          // They typed "1" then something > 2, cap at 12
          setHourInputValue('12')
          setHour(12)
          setHasSelectedTime(true)
          const timeString = get24HourTime(12, minute, meridiem)
          if (onChange) {
            onChange(timeString)
          }
          return
        }
      }
      // Otherwise, don't allow the invalid input
      return
    }
    
    // Allow valid input
    setHourInputValue(inputValue)
    
    const newHour = numValue
    if (newHour < minHour) {
      // Don't update state for values < min, but allow typing
      return
    }
    
    setHour(newHour)
    setHasSelectedTime(true)
    const timeString = get24HourTime(newHour, minute, meridiem)
    if (onChange) {
      onChange(timeString)
    }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onChange:', timeString)
      }
  }

  const handleHourBlur = () => {
    // On blur, ensure we have a valid hour value
    if (hourInputValue === '' || isNaN(parseInt(hourInputValue, 10))) {
      setHourInputValue(hour.toString())
    } else {
      let numValue = parseInt(hourInputValue, 10)
      const maxHour = timeFormat === '24hour' ? 23 : 12
      const minHour = timeFormat === '24hour' ? 0 : 1
      if (numValue > maxHour) numValue = maxHour
      if (numValue < minHour) numValue = minHour
      setHour(numValue)
      setHourInputValue(numValue.toString())
    }
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Allow empty for deletion
    if (inputValue === '') {
      setMinuteInputValue('')
      return
    }
    
    // Validate input as user types
    const numValue = parseInt(inputValue, 10)
    if (isNaN(numValue)) {
      return // Don't update if not a number
    }
    
    // Prevent values greater than 59
    if (numValue > 59) {
      // If they're typing a second digit that makes it > 59, cap at 59
      if (inputValue.length === 2 && inputValue.startsWith('5')) {
        // They typed "5" then something > 9, cap at 59
        setMinuteInputValue('59')
        setMinute(59)
        setHasSelectedTime(true)
        const timeString = get24HourTime(hour, 59, meridiem)
        if (onChange) {
          onChange(timeString)
        }
        return
      }
      // If they typed "6" or higher as first digit, don't allow
      if (inputValue.length === 1 && numValue >= 6) {
        return
      }
      // Otherwise, don't allow the invalid input
      return
    }
    
    // Allow valid input
    setMinuteInputValue(inputValue)
    
    const newMinute = numValue
    if (newMinute < 0) {
      // Don't update state for values < 0, but allow typing
      return
    }
    
    setMinute(newMinute)
    setHasSelectedTime(true)
    const timeString = get24HourTime(hour, newMinute, meridiem)
    if (onChange) {
      onChange(timeString)
    }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onChange:', timeString)
      }
  }

  const handleMinuteBlur = () => {
    // On blur, ensure we have a valid minute value
    if (minuteInputValue === '' || isNaN(parseInt(minuteInputValue, 10))) {
      setMinuteInputValue(minute.toString().padStart(2, '0'))
    } else {
      let numValue = parseInt(minuteInputValue, 10)
      if (numValue > 59) numValue = 59
      if (numValue < 0) numValue = 0
      setMinute(numValue)
      setMinuteInputValue(numValue.toString().padStart(2, '0'))
    }
  }

  const handleMeridiemChange = (mer: 'AM' | 'PM') => {
    setMeridiem(mer)
    setHasSelectedTime(true)
    const timeString = get24HourTime(hour, minute, mer)
    if (onChange) {
      onChange(timeString)
    }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onChange:', timeString)
      }
  }
  
  const handleInputClick = () => {
    setShowDropdown(true)
  }

  const handleInputFocus = () => {
    setShowDropdown(true)
  }
  
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Allow manual input but don't close dropdown
    const inputValue = e.currentTarget.value
    setDisplayValue(inputValue)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const timeString = get24HourTime(hour, minute, meridiem)
      setShowDropdown(false)
      if (onClose) {
        onClose(timeString)
      }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onClose:', timeString)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
    } else if (e.key === 'Tab' && !e.shiftKey && showDropdown) {
      // When tabbing forward from main input and dropdown is open, focus the hour input
      e.preventDefault()
      hourInputRef.current?.focus()
    }
  }

  const handleHourKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'Tab') {
      if (!e.shiftKey) {
        e.preventDefault()
        minuteInputRef.current?.focus()
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const timeString = get24HourTime(hour, minute, meridiem)
      setShowDropdown(false)
      if (onClose) {
        onClose(timeString)
      }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onClose:', timeString)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
    }
  }

  const handleMinuteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      hourInputRef.current?.focus()
    } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
      if (!e.shiftKey) {
        e.preventDefault()
        // In 24-hour format, there's no AM/PM, so just close on Tab
        if (timeFormat === '24hour') {
          const timeString = get24HourTime(hour, minute, meridiem)
          setShowDropdown(false)
          if (onClose) {
            onClose(timeString)
          }
        } else {
          // Focus on AM card input
          amInputRef.current?.focus()
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const timeString = get24HourTime(hour, minute, meridiem)
      setShowDropdown(false)
      if (onClose) {
        onClose(timeString)
      }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onClose:', timeString)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
    }
  }

  const handleAMKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      minuteInputRef.current?.focus()
    } else if (e.key === 'ArrowRight' || e.key === 'Tab') {
      if (!e.shiftKey) {
        e.preventDefault()
        pmInputRef.current?.focus()
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const timeString = get24HourTime(hour, minute, meridiem)
      setShowDropdown(false)
      if (onClose) {
        onClose(timeString)
      }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onClose:', timeString)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
    }
  }

  const handlePMKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault()
      amInputRef.current?.focus()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const timeString = get24HourTime(hour, minute, meridiem)
      setShowDropdown(false)
      if (onClose) {
        onClose(timeString)
      }
      // Console log for debugging (similar to date picker pattern)
      if (process.env.NODE_ENV === 'development') {
        console.log('TimePicker onClose:', timeString)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
    }
  }

  // Set up keyboard handlers for AM/PM inputs
  useEffect(() => {
    if (showDropdown) {
      const amInput = document.getElementById(`${uniqueId}-am`) as HTMLInputElement
      const pmInput = document.getElementById(`${uniqueId}-pm`) as HTMLInputElement
      
      if (amInput) {
        (amInputRef as React.MutableRefObject<HTMLInputElement | null>).current = amInput
        const handleAMKeyDownEvent = (e: KeyboardEvent) => {
          const reactEvent = e as unknown as React.KeyboardEvent<HTMLInputElement>
          handleAMKeyDown(reactEvent)
        }
        amInput.addEventListener('keydown', handleAMKeyDownEvent)
        
        if (pmInput) {
          (pmInputRef as React.MutableRefObject<HTMLInputElement | null>).current = pmInput
          const handlePMKeyDownEvent = (e: KeyboardEvent) => {
            const reactEvent = e as unknown as React.KeyboardEvent<HTMLInputElement>
            handlePMKeyDown(reactEvent)
          }
          pmInput.addEventListener('keydown', handlePMKeyDownEvent)
          
          return () => {
            amInput.removeEventListener('keydown', handleAMKeyDownEvent)
            pmInput.removeEventListener('keydown', handlePMKeyDownEvent)
          }
        }
        
        return () => {
          amInput.removeEventListener('keydown', handleAMKeyDownEvent)
        }
      }
    }
  }, [showDropdown, hour, minute, meridiem, onClose, uniqueId])
  
  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timePickerWrapperRef.current && !timePickerWrapperRef.current.contains(event.target as Node)) {
        const timeString = get24HourTime(hour, minute, meridiem)
        setShowDropdown(false)
        if (onClose) {
          onClose(timeString)
        }
        // Console log for debugging (similar to date picker pattern)
        if (process.env.NODE_ENV === 'development') {
          console.log('TimePicker onClose:', timeString)
        }
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDropdown, hour, minute, meridiem, onClose])

  const getTimezoneText = (): string => {
    const date = new Date()
    const tzAbbr = date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        timeZoneName: "short",
      })
      .slice(4)
    const tzText = date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        timeZoneName: "long",
      })
      .slice(4)
    return `${tzAbbr} (${tzText})`
  }

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_time_picker'), globalProps(props), className)

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
        <Caption
            className="pb_time_picker_kit_label"
            size="md"
            text={label}
        />
      )}
      <div className="time_picker_wrapper">
        <TextInput
            addOn={{ icon: 'clock', alignment: 'right', border: true }}
            id={`${uniqueId}-input`}
            label=""
            name={`${uniqueId}-time`}
            onChange={handleInputChange}
            onClick={handleInputClick}
            onFocus={handleInputFocus}
            placeholder="Select Time"
            type="text"
            value={displayValue}
        >
          <input
              autoComplete="off"
              id={`${uniqueId}-input`}
              name={`${uniqueId}-time`}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyDown}
              placeholder="Select Time"
              readOnly
              type="text"
              value={displayValue}
          />
        </TextInput>
        
        {showDropdown && (
          <div className="pb_time_picker_container">
            <div className="pb_time_selection">
              <Caption
                  className="pb_caption_kit_md"
                  size="md"
                  text="Select Time"
              />
              <div className="numInputWrapper">
                <input
                    aria-label="Hour"
                    className="numInput time-hour"
                    id={`${uniqueId}-hour`}
                    max={timeFormat === '24hour' ? 23 : 12}
                    maxLength={2}
                    min={timeFormat === '24hour' ? 0 : 1}
                    name={`${uniqueId}-hour`}
                    onBlur={handleHourBlur}
                    onChange={handleHourChange}
                    onKeyDown={handleHourKeyDown}
                    ref={hourInputRef}
                    step={1}
                    tabIndex={0}
                    type="number"
                    value={hourInputValue}
                />
                <span className="arrowUp" />
                <span className="arrowDown" />
              </div>
              <span className="time-separator">{':'}</span>
              <div className="numInputWrapper">
                <input
                    aria-label="Minute"
                    className="numInput time-minute"
                    id={`${uniqueId}-minute`}
                    max={59}
                    maxLength={2}
                    min={0}
                    name={`${uniqueId}-minute`}
                    onBlur={handleMinuteBlur}
                    onChange={handleMinuteChange}
                    onKeyDown={handleMinuteKeyDown}
                    ref={minuteInputRef}
                    step={1}
                    tabIndex={0}
                    type="number"
                    value={minuteInputValue}
                />
                <span className="arrowUp" />
                <span className="arrowDown" />
              </div>
              {timeFormat === 'AMPM' && (
                <div className="meridiem">
                  <div className="pb_form_group_kit">
                    <SelectableCard
                        checked={meridiem === 'AM'}
                        inputId={`${uniqueId}-am`}
                        multi={false}
                        name={`${uniqueId}-meridiem`}
                        onChange={() => handleMeridiemChange('AM')}
                        text="AM"
                        value="AM"
                    />
                    <SelectableCard
                        checked={meridiem === 'PM'}
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
              {showTimezone && (
                <Caption
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
