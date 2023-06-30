import moment, { Moment } from 'moment'
import 'moment-strftime'
import 'moment-timezone'

type DateTimeType = {
  value: string | Date,
  zone?: string,
}

const ABBR_DAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S']

export default class DateTime {
  value: Moment & any
  constructor({ value, zone = 'America/New_York' }: DateTimeType) {
    this.value = this.convertToTimestampZone(value, zone)
  }

  convertToTimestampZone(value: string | Date, zone: string) {
    return moment(value).tz(zone)
  }

  convertToTimezone() {
    return this.value.strftime('%Z')
  }

  // toCustomFormat(format = '%-m/%-d') {
  //   return this.value.strftime(format)
  // }

  // toYear() {
  //   return this.value.strftime('%Y')
  // }

  // toMonth() {
  //   return this.value.strftime('%b')
  //   // return this.value.toLocaleString("en-US", {month: "short"})
  // }

  // toMonthNum() {
  //   return this.value.strftime('%-m')
  // }

  // toMonthFull() {
  //   return this.value.strftime('%B')
  // }

  // toDay() {
    // const date = new Date(newDate)
    // const day = date.toLocaleString("en-US", {day: "numeric"})
    // return day
  //   return this.value.strftime('%e')
  // }

  // toDayAbbr() {
  //   return ABBR_DAYS[this.value.day()]
  // }

  // toWeekday() {
  //   return this.value.strftime('%a')
  // }

  // toHour() {
  //   return this.value.strftime('%l')
  // }

  // toMinute() {
  //   return this.value.strftime('%M')
  // }

  // toMeridian() {
  //   return this.value.strftime('%P')[0]
  // }

  // toIso() {
  //   return this.value.toISOString()
  // }

  // toTime() {
  //   const time = this.value.strftime('%I:%M')

  //   // strftime adds a leading 0 on single hour times. ie 08:31.
  //   // this removes that 0 to match the rails kit.
  //   return time.charAt() === '0' ? time.slice(1) : time
  // }

  // toTimezone() {
  //   return this.value.strftime('%Z')
  // }

  // toTimeWithMeridian() {
  //   return this.toTime() + this.toMeridian()
  // }
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const toMonth = (newDate: Date, timeZone?: string): string => {
    if (timeZone) {
      const date = new Date(newDate.toLocaleString(undefined, { timeZone }));
      return months[date.getUTCMonth()]
    } else {
      const date = new Date(newDate)
      return months[date.getUTCMonth()]
    }
}

export const toDay = (newDate: Date, timeZone?: string): number => {
    if (timeZone) {
      const date = new Date(newDate.toLocaleString(undefined, { timeZone }));
      return date.getUTCDate()
    } else {
      const date = new Date(newDate)
      return date.getUTCDate()
    }
}

export const toYear = (newDate: Date, timeZone?: string): number => {
    if (timeZone) {
      const date = new Date(newDate.toLocaleString(undefined, { timeZone }));
      return date.getUTCFullYear()
    } else {
      const date = new Date(newDate)
      return date.getUTCFullYear()
    }
}

export const toIso = (newDate: Date): string => {
    const date = new Date(newDate)
    return date.toISOString()
}

export const toMonthNum = (newDate: Date): number => {
    const date = new Date(newDate)
    return date.getUTCMonth() +1
}

export const toWeekday = (newDate: Date): string => {
    const date = new Date(newDate)
    return days[date.getUTCDay()]
}

export const toMeridiem = (newDate: Date, timeZone?: string): string => {
    const date = new Date(newDate)
    if (timeZone) {
      return date.toLocaleString(undefined, {timeZone, hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
    } else {
      return date.toLocaleString(undefined, {hour12: true }).slice(-2).charAt(0).toLocaleLowerCase();
    }
}

export const toTime = (newDate: Date, timeZone?: string): string => {
    const date = new Date(newDate)
    if (timeZone) {
      return date.toLocaleTimeString(undefined, {timeZone, timeStyle: "short"}).split(' ')[0];
    } else {
      return date.toLocaleTimeString(undefined, {timeStyle: "short"}).split(' ')[0];
    }
}

export const toTimeZone = (newDate: Date, timeZone?: string): string => {
    const date = new Date(newDate)
    if (timeZone) {
      return date.toLocaleString(undefined, {timeZone, timeZoneName: "short"}).split(' ')[3];
    } else {
      return date.toLocaleString(undefined, {timeZoneName: "short"}).split(' ')[3];
    }
}

export const toDayAbbr = (newDate: Date): string => {
  const date = new Date(newDate)
  return ABBR_DAYS[date.getUTCDay()]
}

export const toCustomFormat = (newDate: Date, format = 'month_day'): string => {
  const date = new Date(newDate)
  if (format == "month_day") {
    return `${toMonthNum(date)}/${toDay(date)}`
  } else {
    return `${date.toLocaleString(undefined, {month: "short"})} ${toDay(date)}`
  }
}

export const toTimeWithMeridiem = (newDate: Date, timeZone: string): string => {
  const date = new Date(newDate)
  return `${toTime(date, timeZone)}${toMeridiem(date, timeZone)}`;
}

export const toHour = (newDate: Date, timeZone?: string): string => {
  const date = new Date(newDate)
  if (timeZone) {
    return date.toLocaleTimeString(undefined, {timeZone, hour: "numeric"}).split(' ')[0];
  } else {
    return date.toLocaleTimeString(undefined, {hour: "numeric"}).split(' ')[0];
  }
}

export const toMinute = (newDate: Date, timeZone?: string): string => {
  const date = new Date(newDate)
  if (timeZone) {
    return date.toLocaleTimeString(undefined, {timeZone, hour: "2-digit", minute: "2-digit"}).slice(3, 5);
  } else {
    return date.toLocaleTimeString(undefined, {hour: "2-digit", minute: "2-digit"}).slice(3, 5);
  }
}

export const fromNow = (newDate: Date, timeZone?: string): string => {

  // subtract end time from start time (endTime - startTime)
  // create object of amount of miliseconds as keys and values as strings, seconds ago, minutes ago, months ago etc...
  // compare subtracted time to keys in object and grab the matching string
  // concat the time elapsed with the string and return that


  /*
  {
    0-44s: a few seconds ago
    45-89s: a minute ago
    90s-44m: 2-44 minutes ago ago
    45-89m: an hour ago
    90m-21h: 2-21 hours ago
    22-35h: a day ago
    36h-25d: 2-25 days ago
    26-45d: a month ago
    45-319d: 2-10 months ago
    320-547d: a year ago
    548d+: 2-20 years ago
  }
  */
  const date = new Date(newDate)
  if (timeZone) {
    return date.toLocaleTimeString(undefined, {timeZone, hour: "2-digit", minute: "2-digit"}).slice(3, 5);
  } else {
    return date.toLocaleTimeString(undefined, {hour: "2-digit", minute: "2-digit"}).slice(3, 5);
  }
}