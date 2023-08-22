const ABBR_DAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S']

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const formatDate = (newDate: Date | string) => {
  const isTimelessStringDate = typeof newDate === "string" && !newDate.includes("T")

  if (isTimelessStringDate) {
    const unhyphenatedDate = new Date((newDate as string).replace(/-/g, "/"))
    return unhyphenatedDate
  }

  return new Date(newDate)
}

export const toMinute = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)

  if (timeZone) {
    return date.toLocaleTimeString(undefined, { timeZone, hour: "2-digit", minute: "2-digit" }).slice(3, 5);
  } else {
    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }).slice(3, 5);
  }
}

export const toHour = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)

  if (timeZone) {
    return date.toLocaleTimeString(undefined, { timeZone, hour: "numeric" }).split(' ')[0];
  } else {
    return date.toLocaleTimeString(undefined, { hour: "numeric" }).split(' ')[0];
  }
}

export const toDay = (newDate: Date | string, timeZone?: string): number => {
  if (timeZone) {
    const date = new Date(formatDate(newDate).toLocaleString(undefined, { timeZone }));
    return date.getDate()
  } else {
    const date = formatDate(newDate)
    return date.getDate()
  }
}

export const toDayAbbr = (newDate: Date | string): string => {
  const date = formatDate(newDate)
  return ABBR_DAYS[date.getDay()]
}

export const toWeekday = (newDate: Date | string): string => {
  const date = formatDate(newDate)
  return days[date.getDay()]
}

export const toMonth = (newDate: Date | string, timeZone?: string): string => {
  if (timeZone) {
    const date = new Date(formatDate(newDate).toLocaleString(undefined, { timeZone }));
    return months[date.getMonth()]
  } else {
    const date = formatDate(newDate)
    return months[date.getMonth()]
  }
}

export const toMonthNum = (newDate: Date | string): number => {
  const date = formatDate(newDate)
  return date.getMonth() + 1
}

export const toYear = (newDate: Date | string, timeZone?: string): number => {
  if (timeZone) {
    const date = new Date(formatDate(newDate).toLocaleString(undefined, { timeZone }));
    return date.getFullYear()
  } else {
    const date = formatDate(newDate)
    return date.getFullYear()
  }
}

export const toTime = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)

  if (timeZone) {
    return date.toLocaleTimeString(undefined, { timeZone, timeStyle: "short" }).split(' ')[0];
  } else {
    return date.toLocaleTimeString(undefined, { timeStyle: "short" }).split(' ')[0];
  }
}

export const toMeridiem = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)

  if (timeZone) {
    return date.toLocaleString(undefined, { timeZone, hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
  } else {
    return date.toLocaleString(undefined, { hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
  }
}

export const toTimeZone = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)

  if (timeZone) {
    return date.toLocaleString(undefined, { timeZone, timeZoneName: "short" }).split(' ')[3];
  } else {
    return date.toLocaleString(undefined, { timeZoneName: "short" }).split(' ')[3];
  }
}

export const toTimeWithMeridiem = (newDate: Date | string, timeZone: string): string => {
  const date = formatDate(newDate)
  return `${toTime(date, timeZone)}${toMeridiem(date, timeZone)}`;
}

export const toIso = (newDate: Date | string): string => {
  const date = formatDate(newDate)
  return date.toISOString()
}

export const fromNow = (newDate: Date | string): string => {
  const startDate = formatDate(newDate).getTime()
  const endDate = new Date().getTime()
  const elapsedTime = endDate - startDate
  let elapsedTimeString = `${Math.round(elapsedTime / (365.25 * 24 * 60 * 60 * 1000))} years ago`; // 730+ days

  const MILLISECONDS_IN_A_MONTH = 30.44 * 24 * 60 * 60 * 1000

  const elapsedTimeData = [
    { min: 0, max: 44999, value: "a few seconds ago" }, // 0-44 seconds
    { min: 45000, max: 89999, value: "a minute ago" }, // 45-89 seconds
    { min: 90000, max: 2649999, value: `${Math.round(elapsedTime / 60000)} minutes ago`}, //  90s-44 minutes
    { min: 2650000, max: 7299999, value: "an hour ago" }, // 45-120 minutes
    { min: 7300000, max: 75699999, value: `${Math.round(elapsedTime / 3600000)} hours ago`}, // 2-21 hours
    { min: 75700000, max: 172899999, value: "a day ago" }, // 22-48 hours
    { min: 172900000, max: 2169999999, value: `${Math.round(elapsedTime / 86400000)} days ago`}, // 2-25 days
    { min: 2170000000, max: 5184999999, value: "a month ago"}, // 26-60 days
    { min: 5185000000, max: 27561699999, value: `${Math.round(elapsedTime / MILLISECONDS_IN_A_MONTH)} months ago`}, // 60-319 days
    { min: 27561700000, max: 63072999999, value: "a year ago"}, // 320-730 days
  ];

  for (const timeDate of elapsedTimeData) {
    if (elapsedTime >= timeDate.min && elapsedTime <= timeDate.max) {
      elapsedTimeString = timeDate.value;
      break;
    }
  }

  return elapsedTimeString
}

export const toCustomFormat = (newDate: Date | string, format = 'month_day'): string => {
  const date = formatDate(newDate)
  if (format == "month_day") {
    return `${toMonthNum(date)}/${toDay(date)}`
  } else {
    return `${date.toLocaleString(undefined, { month: "short" })} ${toDay(date)}`
  }
}

// For quickPick.tsx
// Yesterday
export const getYesterdayDate = (newDate: Date | string): Date => {
  const today = formatDate(newDate)
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  return yesterday
}

// Weeks
export const getFirstDayOfWeek = (newDate: Date | string): Date => {
  const today = formatDate(newDate)
  const dayOfWeek = today.getDay()
  // Replicate Moment.js: Start of week (Monday) has a time of 00:00:00
  const firstDayOfWeek = new Date(today.setHours(0, 0, 0))
  const isSunday = dayOfWeek === 0

  const daysToSubtract = isSunday ? 6 : (dayOfWeek - 1)
  firstDayOfWeek.setDate(today.getDate() - daysToSubtract)

  return firstDayOfWeek
}

export const getLastDayOfWeek = (newDate: Date | string): Date => {
  const today = formatDate(newDate)
  const dayOfWeek = today.getDay()
  // Replicate Moment.js: End of week (Sunday) has a time of 23:59:59
  const lastDayOfWeek = new Date(today.setHours(23, 59, 59, 0))
  const isSunday = dayOfWeek === 0

  const daysToAdd = isSunday ? 0 : (7 - dayOfWeek)
  lastDayOfWeek.setDate(today.getDate() + daysToAdd)

  return lastDayOfWeek
}

export const getPreviousWeekStartDate = (newDate: Date | string): Date => {
  const firstDayOfWeek = getFirstDayOfWeek(newDate)
  const firstDayOfPreviousWeek = new Date(
    firstDayOfWeek.getFullYear(),
    firstDayOfWeek.getMonth(),
    firstDayOfWeek.getDate() - 7
  )

  return firstDayOfPreviousWeek
}

export const getPreviousWeekEndDate = (newDate: Date | string): Date => {
  const lastDayOfWeek = getLastDayOfWeek(newDate)
  const lastDayOfPreviousWeek = new Date(
    lastDayOfWeek.getFullYear(),
    lastDayOfWeek.getMonth(),
    lastDayOfWeek.getDate() - 7,
    lastDayOfWeek.getHours(),
    lastDayOfWeek.getMinutes(),
    lastDayOfWeek.getSeconds()
  )

  return lastDayOfPreviousWeek
}

// Months
export const getMonthStartDate = (newDate: Date | string): Date => {
  const date = formatDate(newDate)
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)

  return firstDayOfMonth
}

export const getMonthEndDate = (newDate: Date | string): Date => {
  const date = formatDate(newDate)
  // Replicate Moment.js: End of month has a time of 23:59:59
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)

  return lastDayOfMonth
}

export const getPreviousMonthStartDate = (newDate: Date | string): Date => {
  const firstDayOfMonth = getMonthStartDate(newDate)
  const firstDayOfPreviousMonth = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth() - 1,
    firstDayOfMonth.getDate()
  )

  return firstDayOfPreviousMonth
}

export const getPreviousMonthEndDate = (newDate: Date | string): Date => {
  const lastDayOfMonth = getMonthEndDate(newDate)
  const lastDayOfPreviousMonth = new Date(
    lastDayOfMonth.getFullYear(),
    lastDayOfMonth.getMonth() - 1,
    lastDayOfMonth.getDate(),
    lastDayOfMonth.getHours(),
    lastDayOfMonth.getMinutes(),
    lastDayOfMonth.getSeconds()
  )

  return lastDayOfPreviousMonth
}

// Quarters
export const getQuarterStartDate = (newDate: Date | string): Date => {
  const date = formatDate(newDate)
  const quarter = Math.floor(date.getMonth() / 3)
  const startOfQuarter = new Date(date.getFullYear(), quarter * 3, 1)

  return startOfQuarter
}

export const getQuarterEndDate = (newDate: Date | string): Date => {
  const date = formatDate(newDate)
  const quarter = Math.floor(date.getMonth() / 3)
  const startOfNextQuarter = new Date(date.getFullYear(), (quarter + 1) * 3, 1)
  // Replicate Moment.js: End of quarter has a time of 23:59:59
  const endOfQuarter = new Date(startOfNextQuarter.getTime() - 1)

  return endOfQuarter
}

export const getPreviousQuarterStartDate = (newDate: Date | string): Date => {
  const startOfQuarter = getQuarterStartDate(newDate)
  const firstDayOfPreviousQuarter = new Date(
    startOfQuarter.getFullYear(),
    startOfQuarter.getMonth() - 3,
    startOfQuarter.getDate()
  )

  return firstDayOfPreviousQuarter
}

export const getPreviousQuarterEndDate = (newDate: Date | string): Date => {
  const endOfQuarter = getQuarterEndDate(newDate)
  const lastDayOfPreviousQuarter = new Date(
    endOfQuarter.getFullYear(),
    endOfQuarter.getMonth() - 3,
    endOfQuarter.getDate(),
    endOfQuarter.getHours(),
    endOfQuarter.getMinutes(),
    endOfQuarter.getSeconds()
  )

  return lastDayOfPreviousQuarter
}

// Years
export const getYearStartDate = (newDate: Date | string): Date => {
  const date = formatDate(newDate)
  const startOfYear = new Date(date.getFullYear(), 0, 1)

  return startOfYear
}

export const getYearEndDate = (newDate: Date | string): Date => {
  const date = formatDate(newDate)
  const endOfYear = new Date(date.getFullYear(), 11, 31, 23, 59, 59)

  return endOfYear
}

export const getPreviousYearStartDate = (newDate: Date | string): Date => {
  const startOfYear = getYearStartDate(newDate)
  const firstDayOfPreviousYear = new Date(
    startOfYear.getFullYear() - 1,
    startOfYear.getMonth(),
    startOfYear.getDate()
  )

  return firstDayOfPreviousYear
}

export const getPreviousYearEndDate = (newDate: Date | string): Date => {
  const endOfYear = getYearEndDate(newDate)
  const lastDayOfPreviousYear = new Date(
    endOfYear.getFullYear() - 1,
    endOfYear.getMonth(),
    endOfYear.getDate(),
    endOfYear.getHours(),
    endOfYear.getMinutes(),
    endOfYear.getSeconds()
  )

  return lastDayOfPreviousYear
}

export default {
  toMinute,
  toHour,
  toDay,
  toDayAbbr,
  toWeekday,
  toMonth,
  toMonthNum,
  toYear,
  toTime,
  toMeridiem,
  toTimeZone,
  toTimeWithMeridiem,
  toIso,
  fromNow,
  toCustomFormat,
  getYesterdayDate,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getPreviousWeekStartDate,
  getPreviousWeekEndDate,
  getMonthStartDate,
  getMonthEndDate,
  getPreviousMonthStartDate,
  getPreviousMonthEndDate,
  getQuarterStartDate,
  getQuarterEndDate,
  getPreviousQuarterStartDate,
  getPreviousQuarterEndDate,
  getYearStartDate,
  getYearEndDate,
  getPreviousYearStartDate,
  getPreviousYearEndDate
}
