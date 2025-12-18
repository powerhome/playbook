// Time Picker Helper Functions
// Utility functions for parsing, validating, and formatting time values

export type ParsedTime = {
  hour: number
  minute: number
  meridiem: 'AM' | 'PM'
}

export type TimeFormat = 'AMPM' | '24hour'

export type HourConstraints = {
  maxHour: number
  minHour: number
}

export type HourInputResult = {
  value: string
  hour: number | null
  isValid: boolean
  capped: boolean
}

export type MinuteInputResult = {
  value: string
  minute: number | null
  isValid: boolean
  capped: boolean
}

export type FormatConversionResult = {
  hour: number
  meridiem: 'AM' | 'PM'
  changed: boolean
}

// ===========================================================
// |                Time Parsing Utilities                   |
// ===========================================================

/**
 * Parse a time string to minutes since midnight for comparison
 * @param timeStr - Time string in "HH:MM" format (24-hour)
 * @returns Minutes since midnight, or null if invalid
 */
export const parseTimeToMinutes = (timeStr: string | undefined): number | null => {
  if (!timeStr) return null
  const match = timeStr.match(/(\d{1,2}):(\d{2})/)
  if (match) {
    const h = parseInt(match[1], 10)
    const m = parseInt(match[2], 10)
    return h * 60 + m
  }
  return null
}

/**
 * Parse a time string into hour, minute, and meridiem components
 * @param timeStr - Time string in "HH:MM" (24-hour) or "H:MM AM/PM" (12-hour) format
 * @param timeFormat - The target time format ('AMPM' or '24hour')
 * @returns Parsed time object with hour, minute, and meridiem
 */
export const parseTime = (
  timeStr: string | undefined,
  timeFormat: TimeFormat = 'AMPM'
): ParsedTime => {
  if (!timeStr) {
    // Default to 12:00 PM when no time is provided
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

    return { hour, minute, meridiem }
  }

  return { hour: 12, minute: 0, meridiem: 'PM' }
}

// ===========================================================
// |               Time Validation Utilities                 |
// ===========================================================

/**
 * Check if a given time is within the allowed min/max range
 * @param h - Hour value
 * @param m - Minute value
 * @param mer - Meridiem ('AM' or 'PM'), required for AMPM format
 * @param timeFormat - The time format being used
 * @param minTimeMinutes - Minimum time in minutes since midnight
 * @param maxTimeMinutes - Maximum time in minutes since midnight
 * @returns True if time is within range
 */
export const isTimeInRange = (
  h: number,
  m: number,
  mer: 'AM' | 'PM' | undefined,
  timeFormat: TimeFormat,
  minTimeMinutes: number | null,
  maxTimeMinutes: number | null
): boolean => {
  let hour24 = h
  // Convert to 24-hour if we have meridiem and are in AMPM mode
  if (timeFormat === 'AMPM' && mer) {
    if (mer === 'PM' && h !== 12) hour24 = h + 12
    if (mer === 'AM' && h === 12) hour24 = 0
  }
  const timeInMinutes = hour24 * 60 + m

  if (minTimeMinutes !== null && timeInMinutes < minTimeMinutes) return false
  if (maxTimeMinutes !== null && timeInMinutes > maxTimeMinutes) return false
  return true
}

/**
 * Check if a specific hour is completely disabled (all minutes are out of range)
 * @param h - Hour value
 * @param mer - Meridiem ('AM' or 'PM')
 * @param timeFormat - The time format being used
 * @param minTimeMinutes - Minimum time in minutes since midnight
 * @param maxTimeMinutes - Maximum time in minutes since midnight
 * @returns True if the entire hour is disabled
 */
export const isHourDisabled = (
  h: number,
  mer: 'AM' | 'PM' | undefined,
  timeFormat: TimeFormat,
  minTimeMinutes: number | null,
  maxTimeMinutes: number | null
): boolean => {
  // Check if any minute in this hour is valid
  for (let m = 0; m < 60; m++) {
    if (isTimeInRange(h, m, mer, timeFormat, minTimeMinutes, maxTimeMinutes)) return false
  }
  return true
}

/**
 * Check if ANY AM time is valid in the range (for disabling AM toggle)
 * @param minTimeMinutes - Minimum time in minutes since midnight
 * @param maxTimeMinutes - Maximum time in minutes since midnight
 * @returns True if any AM time is valid
 */
export const isAnyAMTimeValid = (
  minTimeMinutes: number | null,
  maxTimeMinutes: number | null
): boolean => {
  if (minTimeMinutes === null && maxTimeMinutes === null) return true
  // AM times are 00:00 to 11:59 (0-719 minutes)
  const amStart = 0
  const amEnd = 719
  const rangeStart = minTimeMinutes ?? 0
  const rangeEnd = maxTimeMinutes ?? 1439
  // Check if AM range overlaps with valid range
  return amStart <= rangeEnd && amEnd >= rangeStart
}

/**
 * Check if ANY PM time is valid in the range (for disabling PM toggle)
 * @param minTimeMinutes - Minimum time in minutes since midnight
 * @param maxTimeMinutes - Maximum time in minutes since midnight
 * @returns True if any PM time is valid
 */
export const isAnyPMTimeValid = (
  minTimeMinutes: number | null,
  maxTimeMinutes: number | null
): boolean => {
  if (minTimeMinutes === null && maxTimeMinutes === null) return true
  // PM times are 12:00 to 23:59 (720-1439 minutes)
  const pmStart = 720
  const pmEnd = 1439
  const rangeStart = minTimeMinutes ?? 0
  const rangeEnd = maxTimeMinutes ?? 1439
  // Check if PM range overlaps with valid range
  return pmStart <= rangeEnd && pmEnd >= rangeStart
}

// ===========================================================
// |              Time Formatting Utilities                  |
// ===========================================================

/**
 * Format time for display in the input field
 * @param h - Hour value
 * @param m - Minute value
 * @param mer - Meridiem ('AM' or 'PM')
 * @param timeFormat - The time format to use for display
 * @returns Formatted time string
 */
export const getDisplayTime = (
  h: number,
  m: number,
  mer: 'AM' | 'PM',
  timeFormat: TimeFormat
): string => {
  if (timeFormat === '24hour') {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  }
  return `${h}:${m.toString().padStart(2, '0')} ${mer}`
}

/**
 * Convert time to 24-hour format string for onChange/onClose callbacks
 * @param h - Hour value
 * @param m - Minute value
 * @param mer - Meridiem ('AM' or 'PM')
 * @param timeFormat - The current time format
 * @returns Time string in "HH:MM" 24-hour format
 */
export const get24HourTime = (
  h: number,
  m: number,
  mer: 'AM' | 'PM',
  timeFormat: TimeFormat
): string => {
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

/**
 * Format a 24-hour time string to display format based on timeFormat
 * @param time24 - Time string in "HH:MM" 24-hour format
 * @param timeFormat - The target time format for display
 * @returns Formatted time string
 */
export const formatTimeForDisplay = (
  time24: string,
  timeFormat: TimeFormat
): string => {
  const match = time24.match(/(\d{1,2}):(\d{2})/)
  if (!match) return time24

  let h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  const mStr = m.toString().padStart(2, '0')

  if (timeFormat === '24hour') {
    return `${h}:${mStr}`
  }

  // 12-hour format
  const meridiem = h >= 12 ? 'PM' : 'AM'
  if (h === 0) h = 12
  else if (h > 12) h = h - 12
  return `${h}:${mStr}${meridiem}`
}

/**
 * Generate the time range error message in the correct format
 * @param minTime - Minimum time in "HH:MM" format
 * @param maxTime - Maximum time in "HH:MM" format
 * @param timeFormat - The time format for display
 * @returns Error message string
 */
export const getTimeRangeErrorMessage = (
  minTime: string | undefined,
  maxTime: string | undefined,
  timeFormat: TimeFormat
): string => {
  const minFormatted = minTime ? formatTimeForDisplay(minTime, timeFormat) : null
  const maxFormatted = maxTime ? formatTimeForDisplay(maxTime, timeFormat) : null

  if (minFormatted && maxFormatted) {
    return `Select a time between ${minFormatted} and ${maxFormatted}.`
  } else if (minFormatted) {
    return `Select a time after ${minFormatted}.`
  } else if (maxFormatted) {
    return `Select a time before ${maxFormatted}.`
  }
  return 'Selected time is out of range.'
}

// ===========================================================
// |                 Timezone Utilities                      |
// ===========================================================

/**
 * Get the current timezone text for display
 * @returns Timezone string like "EST (Eastern Standard Time)"
 */
export const getTimezoneText = (): string => {
  const date = new Date()
  const tzAbbr = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      timeZoneName: 'short',
    })
    .slice(4)
  const tzText = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      timeZoneName: 'long',
    })
    .slice(4)
  return `${tzAbbr} (${tzText})`
}

// ===========================================================
// |              Hour/Minute Input Handling                 |
// ===========================================================

/**
 * Get the hour constraints based on time format
 * @param timeFormat - The time format being used
 * @returns Object with maxHour and minHour
 */
export const getHourConstraints = (timeFormat: TimeFormat): HourConstraints => {
  return {
    maxHour: timeFormat === '24hour' ? 23 : 12,
    minHour: timeFormat === '24hour' ? 0 : 1,
  }
}

/**
 * Validate and process hour input value
 * @param rawValue - The raw input value
 * @param timeFormat - The time format being used
 * @returns Result object with processed value, hour number, and validation status
 */
export const processHourInput = (
  rawValue: string,
  timeFormat: TimeFormat
): HourInputResult => {
  // Allow empty for deletion
  if (rawValue === '') {
    return { value: '', hour: null, isValid: true, capped: false }
  }

  // Only allow digits
  if (!/^\d+$/.test(rawValue)) {
    return { value: rawValue, hour: null, isValid: false, capped: false }
  }

  // Limit to 2 characters max
  if (rawValue.length > 2) {
    return { value: rawValue, hour: null, isValid: false, capped: false }
  }

  // Parse the numeric value
  const numValue = parseInt(rawValue, 10)
  if (isNaN(numValue)) {
    return { value: rawValue, hour: null, isValid: false, capped: false }
  }

  const { maxHour, minHour } = getHourConstraints(timeFormat)

  // Cap at max if exceeded
  if (numValue > maxHour) {
    return { value: maxHour.toString(), hour: maxHour, isValid: true, capped: true }
  }

  // Return valid result - preserve raw value for display (leading zeros)
  return {
    value: rawValue,
    hour: numValue >= minHour ? numValue : null,
    isValid: true,
    capped: false,
  }
}

/**
 * Normalize hour input value on blur
 * @param inputValue - The current input value
 * @param currentHour - The current hour state
 * @param timeFormat - The time format being used
 * @returns Object with normalized hour and display value
 */
export const normalizeHourOnBlur = (
  inputValue: string,
  currentHour: number,
  timeFormat: TimeFormat
): { hour: number; displayValue: string } => {
  if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
    return { hour: currentHour, displayValue: currentHour.toString() }
  }

  let numValue = parseInt(inputValue, 10)
  const { maxHour, minHour } = getHourConstraints(timeFormat)

  if (numValue > maxHour) numValue = maxHour
  if (numValue < minHour) numValue = minHour

  return { hour: numValue, displayValue: numValue.toString() }
}

/**
 * Validate and process minute input value
 * @param rawValue - The raw input value
 * @returns Result object with processed value, minute number, and validation status
 */
export const processMinuteInput = (rawValue: string): MinuteInputResult => {
  // Allow empty for deletion
  if (rawValue === '') {
    return { value: '', minute: null, isValid: true, capped: false }
  }

  // Only allow digits
  if (!/^\d+$/.test(rawValue)) {
    return { value: rawValue, minute: null, isValid: false, capped: false }
  }

  // Limit to 2 characters max
  if (rawValue.length > 2) {
    return { value: rawValue, minute: null, isValid: false, capped: false }
  }

  // Parse the numeric value
  const numValue = parseInt(rawValue, 10)
  if (isNaN(numValue)) {
    return { value: rawValue, minute: null, isValid: false, capped: false }
  }

  // Cap at 59 if exceeded
  if (numValue > 59) {
    return { value: '59', minute: 59, isValid: true, capped: true }
  }

  // For minutes, always display with leading zero for 0-9
  const displayValue = numValue.toString().padStart(2, '0')

  return {
    value: displayValue,
    minute: numValue >= 0 ? numValue : null,
    isValid: true,
    capped: false,
  }
}

/**
 * Normalize minute input value on blur
 * @param inputValue - The current input value
 * @param currentMinute - The current minute state
 * @returns Object with normalized minute and display value
 */
export const normalizeMinuteOnBlur = (
  inputValue: string,
  currentMinute: number
): { minute: number; displayValue: string } => {
  if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
    return { minute: currentMinute, displayValue: currentMinute.toString().padStart(2, '0') }
  }

  let numValue = parseInt(inputValue, 10)
  if (numValue > 59) numValue = 59
  if (numValue < 0) numValue = 0

  return { minute: numValue, displayValue: numValue.toString().padStart(2, '0') }
}

// ===========================================================
// |              Hour Format Conversion                     |
// ===========================================================

/**
 * Convert hour from 12-hour to 24-hour format
 * @param hour - Hour in 12-hour format (1-12)
 * @param meridiem - 'AM' or 'PM'
 * @returns Hour in 24-hour format (0-23)
 */
export const to24Hour = (hour: number, meridiem: 'AM' | 'PM'): number => {
  let hour24 = hour
  if (meridiem === 'PM' && hour !== 12) hour24 = hour + 12
  if (meridiem === 'AM' && hour === 12) hour24 = 0
  return Math.max(0, Math.min(23, hour24))
}

/**
 * Convert hour from 24-hour to 12-hour format
 * @param hour24 - Hour in 24-hour format (0-23)
 * @returns Object with hour (1-12) and meridiem ('AM' or 'PM')
 */
export const to12Hour = (hour24: number): { hour: number; meridiem: 'AM' | 'PM' } => {
  let hour = hour24
  let meridiem: 'AM' | 'PM' = 'AM'

  if (hour24 > 12) {
    hour = hour24 % 12
    meridiem = 'PM'
  } else if (hour24 === 12) {
    meridiem = 'PM'
  } else if (hour24 === 0) {
    hour = 12
    meridiem = 'AM'
  }

  return { hour, meridiem }
}

/**
 * Convert hour when switching from 12-hour to 24-hour format
 * @param hour - Current hour value
 * @param meridiem - Current meridiem
 * @returns Conversion result with new hour and whether it changed
 */
export const convertTo24HourFormat = (
  hour: number,
  meridiem: 'AM' | 'PM'
): FormatConversionResult => {
  let hour24 = hour
  if (meridiem === 'PM' && hour !== 12) hour24 = hour + 12
  if (meridiem === 'AM' && hour === 12) hour24 = 0
  if (hour24 > 23) hour24 = 23
  if (hour24 < 0) hour24 = 0

  return {
    hour: hour24,
    meridiem: hour24 < 12 ? 'AM' : 'PM',
    changed: hour24 !== hour,
  }
}

/**
 * Convert hour when switching from 24-hour to 12-hour format
 * @param hour - Current hour value (0-23)
 * @param currentMeridiem - Current meridiem value
 * @returns Conversion result with new hour, meridiem, and whether it changed
 */
export const convertTo12HourFormat = (
  hour: number,
  currentMeridiem: 'AM' | 'PM'
): FormatConversionResult => {
  let hour12 = hour
  let newMeridiem = currentMeridiem
  let shouldUpdateMeridiem = false

  if (hour12 > 12) {
    hour12 = hour12 % 12
    newMeridiem = 'PM'
    shouldUpdateMeridiem = true
  } else if (hour12 === 0) {
    hour12 = 12
    newMeridiem = 'AM'
    shouldUpdateMeridiem = true
  } else if (hour12 === 12) {
    // 12 in 24-hour format is 12 PM
    newMeridiem = 'PM'
    shouldUpdateMeridiem = true
  }

  // Clamp to valid 12-hour range
  if (hour12 > 12) hour12 = 12
  if (hour12 < 1) hour12 = 1

  return {
    hour: hour12,
    meridiem: shouldUpdateMeridiem ? newMeridiem : currentMeridiem,
    changed: hour12 !== hour || (shouldUpdateMeridiem && newMeridiem !== currentMeridiem),
  }
}

export default {
  parseTimeToMinutes,
  parseTime,
  isTimeInRange,
  isHourDisabled,
  isAnyAMTimeValid,
  isAnyPMTimeValid,
  getDisplayTime,
  get24HourTime,
  formatTimeForDisplay,
  getTimeRangeErrorMessage,
  getTimezoneText,
  getHourConstraints,
  processHourInput,
  normalizeHourOnBlur,
  processMinuteInput,
  normalizeMinuteOnBlur,
  to24Hour,
  to12Hour,
  convertTo24HourFormat,
  convertTo12HourFormat,
}
