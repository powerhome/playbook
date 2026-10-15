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
        const parsed = new Date(value)
        if (Number.isNaN(parsed.getTime())) return
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
      const parsed = new Date(value)
      if (Number.isNaN(parsed.getTime())) return
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
