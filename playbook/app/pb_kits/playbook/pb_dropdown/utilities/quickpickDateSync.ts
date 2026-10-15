// QuickPick → DatePicker sync helpers.
// End-of-day uses 23:59:59 to match pb_kit/dateTime period-end helpers.

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

/** True when the Date carries a time other than midnight or end-of-day (23:59:59). */
export const dateHasExplicitTime = (date: Date): boolean => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const ms = date.getMilliseconds()
  const isMidnight = hours === 0 && minutes === 0 && seconds === 0 && ms === 0
  const isEndOfDay = hours === 23 && minutes === 59 && seconds === 59
  return !isMidnight && !isEndOfDay
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
 * With enableTime and no explicit time: start → 00:00:00, end → 23:59:59.
 * Date-only pickers keep the existing m/d/Y string path.
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
      picker.setDate(value, true, "m/d/Y")
    } else {
      picker.setDate(value, true)
    }
    return
  }

  let date: Date

  if (typeof value === "string") {
    if (stringHasExplicitTime(value)) {
      picker.setDate(value, true)
      return
    }
    date = parseQuickPickDateOnly(value) ?? new Date(value)
  } else {
    date = new Date(value.getTime())
  }

  if (Number.isNaN(date.getTime())) return

  if (!dateHasExplicitTime(date)) {
    date = bound === "start" ? startOfDay(date) : endOfDay(date)
  }

  picker.setDate(date, true)
}