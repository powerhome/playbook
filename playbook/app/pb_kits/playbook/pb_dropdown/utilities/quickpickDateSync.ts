// QuickPick → DatePicker sync helpers.
// End-of-day uses 23:59:59 to match pb_kit/dateTime period-end helpers.
//
// Contract when the target Flatpickr has enableTime:
// - Date-only strings (e.g. m/d/Y) → start of day / end of day by bound
// - Timed strings → parse to Date and pass through unchanged
// - Date objects → pass through unchanged (presets already SOD/EOD via toQuickPickRange;
//   custom values may intentionally use midnight or 23:59:59)

type FlatpickrLike = {
  setDate: (date: Date | string, triggerChange?: boolean, format?: string) => void
  config?: { enableTime?: boolean }
}

export type QuickPickDateBound = "start" | "end"

const DATE_ONLY_MDY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
// Mirrors Rails QuickpickHelper#parse_datetime_string for US m/d/Y + optional AM/PM.
const MDY_WITH_TIME =
  /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i
// Offset-less wall-clock from Rails format_date / format_value (no Z / ±HH:MM).
const WALL_CLOCK_ISO =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?$/

export const startOfDay = (date: Date): Date => {
  const next = new Date(date.getTime())
  next.setHours(0, 0, 0, 0)
  return next
}

export const endOfDay = (date: Date): Date => {
  const next = new Date(date.getTime())
  next.setHours(23, 59, 59, 0)
  return next
}

export const stringHasExplicitTime = (value: string): boolean => {
  return /[T\s]\d{1,2}:\d{2}/.test(value) || /\d{1,2}:\d{2}\s*(AM|PM)/i.test(value)
}

export const parseQuickPickDateOnly = (value: string): Date | null => {
  const match = value.trim().match(DATE_ONLY_MDY)
  if (!match) return null
  const month = Number(match[1])
  const day = Number(match[2])
  const year = Number(match[3])
  return new Date(year, month - 1, day)
}

/**
 * Parse timed QuickPick custom strings to a local Date.
 * - m/d/Y + time (optional seconds / AM|PM) → wall-clock components (Safari-safe)
 * - Offset-less YYYY-MM-DDTHH:MM:SS → wall-clock components
 * - ISO with Z / offset → absolute instant via Date constructor
 */
export const parseQuickPickDateTime = (value: string): Date | null => {
  const trimmed = value.trim()

  const mdy = trimmed.match(MDY_WITH_TIME)
  if (mdy) {
    const month = Number(mdy[1])
    const day = Number(mdy[2])
    const year = Number(mdy[3])
    let hour = Number(mdy[4])
    const minute = Number(mdy[5])
    const second = mdy[6] != null ? Number(mdy[6]) : 0
    const meridiem = mdy[7]?.toUpperCase()
    if (meridiem === "AM" && hour === 12) hour = 0
    if (meridiem === "PM" && hour !== 12) hour += 12
    return new Date(year, month - 1, day, hour, minute, second)
  }

  const wallClock = trimmed.match(WALL_CLOCK_ISO)
  if (wallClock) {
    const year = Number(wallClock[1])
    const month = Number(wallClock[2])
    const day = Number(wallClock[3])
    const hour = Number(wallClock[4])
    const minute = Number(wallClock[5])
    const second = wallClock[6] != null ? Number(wallClock[6]) : 0
    return new Date(year, month - 1, day, hour, minute, second)
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed
}

/**
 * Apply a QuickPick date to a Flatpickr instance.
 * With enableTime and a date-only string: start → 00:00:00, end → 23:59:59.
 * Timed strings and Date values are passed through unchanged.
 * Date-only pickers keep the existing m/d/Y string path for date-only values.
 */
export const setQuickPickDateOnPicker = (
  picker: FlatpickrLike | null | undefined,
  value: Date | string | null | undefined,
  bound: QuickPickDateBound,
): void => {
  if (!picker || value == null || value === "") return

  const enableTime = Boolean(picker.config?.enableTime)

  if (!enableTime) {
    if (typeof value === "string") {
      // Timed payloads (ISO / datetime) are not valid for Flatpickr's m/d/Y format.
      if (stringHasExplicitTime(value)) {
        const parsed = parseQuickPickDateTime(value)
        if (!parsed) return
        picker.setDate(parsed, true)
        return
      }
      picker.setDate(value, true, "m/d/Y")
    } else {
      picker.setDate(value, true)
    }
    return
  }

  if (typeof value === "string") {
    if (stringHasExplicitTime(value)) {
      const parsed = parseQuickPickDateTime(value)
      if (!parsed) return
      picker.setDate(parsed, true)
      return
    }

    let date = parseQuickPickDateOnly(value) ?? new Date(value)
    if (Number.isNaN(date.getTime())) return
    date = bound === "start" ? startOfDay(date) : endOfDay(date)
    picker.setDate(date, true)
    return
  }

  picker.setDate(value, true)
}
