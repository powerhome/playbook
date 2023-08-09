const ABBR_DAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S']

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const formatDate = (newDate: Date | string) => {
  const isTimelessStringDate = typeof newDate === "string" && !newDate.includes("T")

  if (isTimelessStringDate) {
    const unhyphenatedDate = new Date(newDate.replace(/-/g, "/"))
    return unhyphenatedDate
  }

  return new Date(newDate)
}

export const toMinute = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)
  if (timeZone) {
    return date.toLocaleTimeString(undefined, {timeZone, hour: "2-digit", minute: "2-digit"}).slice(3, 5);
  } else {
    return date.toLocaleTimeString(undefined, {hour: "2-digit", minute: "2-digit"}).slice(3, 5);
  }
}

export const toHour = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)
  if (timeZone) {
    return date.toLocaleTimeString(undefined, {timeZone, hour: "numeric"}).split(' ')[0];
  } else {
    return date.toLocaleTimeString(undefined, {hour: "numeric"}).split(' ')[0];
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
  return ABBR_DAYS[date.getUTCDay()]
}

export const toWeekday = (newDate: Date | string): string => {
    const date = formatDate(newDate)
    return days[date.getUTCDay()]
}

export const toMonth = (newDate: Date | string, timeZone?: string): string => {
    if (timeZone) {
      const date = new Date(formatDate(newDate).toLocaleString(undefined, { timeZone }));
      return months[date.getUTCMonth()]
    } else {
      const date = formatDate(newDate)
      return months[date.getUTCMonth()]
    }
}

export const toMonthNum = (newDate: Date | string): number => {
  const date = formatDate(newDate)
  return date.getUTCMonth() +1
}

export const toYear = (newDate: Date | string, timeZone?: string): number => {
    if (timeZone) {
      const date = new Date(newDate.toLocaleString(undefined, { timeZone }));
      return date.getUTCFullYear()
    } else {
      const date = new Date(newDate)
      return date.getUTCFullYear()
    }
}

export const toTime = (newDate: Date | string, timeZone?: string): string => {
  const date = formatDate(newDate)
  if (timeZone) {
    return date.toLocaleTimeString(undefined, {timeZone, timeStyle: "short"}).split(' ')[0];
  } else {
    return date.toLocaleTimeString(undefined, {timeStyle: "short"}).split(' ')[0];
  }
}

export const toMeridiem = (newDate: Date | string, timeZone?: string): string => {
    const date = formatDate(newDate)
    if (timeZone) {
      return date.toLocaleString(undefined, {timeZone, hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
    } else {
      return date.toLocaleString(undefined, {hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
    }
}

export const toTimeZone = (newDate: Date | string, timeZone?: string): string => {
    const date = formatDate(newDate)
    if (timeZone) {
      return date.toLocaleString(undefined, {timeZone, timeZoneName: "short"}).split(' ')[3];
    } else {
      return date.toLocaleString(undefined, {timeZoneName: "short"}).split(' ')[3];
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
  let elapsedTimeString = `${Math.round(elapsedTime / (365.25 * 24 * 60 * 60 * 1000))} years ago.`; // 730+ days

  const elapsedTimeData = [
    { min: 0, max: 44999, value: "a few seconds ago" }, // 0-44 seconds
    { min: 45000, max: 89999, value: "a minute ago" }, // 45-89 seconds
    { min: 90000, max: 2649999, value: `${Math.round(elapsedTime / 60000)} minutes ago`}, //  90s-44 minutes
    { min: 2650000, max: 7299999, value: "an hour ago" }, // 45-120 minutes
    { min: 7300000, max: 75699999, value: `${Math.round(elapsedTime / 3600000)} hours ago`}, // 2-21 hours
    { min: 75700000, max: 172899999, value: "a day ago" }, // 22-48 hours
    { min: 172900000, max: 2169999999, value: `${Math.round(elapsedTime / 86400000)} days ago`}, // 2-25 days
    { min: 2170000000, max: 5184999999, value: "a month ago"}, // 26-60 days
    { min: 5185000000, max: 27561699999, value: `${Math.round(elapsedTime / 30.44 * 24 * 60 * 60 * 1000)} months ago`}, // 60-319 days
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
    return `${date.toLocaleString(undefined, {month: "short"})} ${toDay(date)}`
  }
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
}
