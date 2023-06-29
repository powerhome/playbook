
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

  toMonthFull() {
    return this.value.strftime('%B')
  }

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

  toHour() {
    return this.value.strftime('%l')
  }

  toMinute() {
    return this.value.strftime('%M')
  }

  toMeridian() {
    return this.value.strftime('%P')[0]
  }

  // toIso() {
  //   return this.value.toISOString()
  // }

  toTime() {
    const time = this.value.strftime('%I:%M')

    // strftime adds a leading 0 on single hour times. ie 08:31.
    // this removes that 0 to match the rails kit.
    return time.charAt() === '0' ? time.slice(1) : time
  }

  toTimezone() {
    return this.value.strftime('%Z')
  }

  toTimeWithMeridian() {
    return this.toTime() + this.toMeridian()
  }
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const toMonth = (newDate: Date): string => {
    const date = new Date(newDate)
    return months[date.getUTCMonth()]
}

export const toDay = (newDate: Date): number => {
    const date = new Date(newDate)
    return date.getUTCDate()
}

export const toYear = (newDate: Date): number => {
    const date = new Date(newDate)
    return date.getUTCFullYear()
}

export const toIso = (newDate: Date): string => {
    const date = new Date(newDate)
    const isoString = date.toISOString()
    return isoString
}

export const toMonthNum = (newDate: Date): number => {
    const date = new Date(newDate)
    return date.getUTCMonth() +1
}

export const toWeekday = (newDate: Date): string => {
    const date = new Date(newDate)
    return days[date.getUTCDay()]
}

export const toMeridiem = (newDate: Date): string => {
    const date = new Date(newDate)
    return date.toLocaleString(undefined, { hour12: true }).slice(-2).charAt(0);
}

export const toTimeNew = (newDate: Date): string => {
    const date = new Date(newDate)
    return date.toLocaleTimeString(undefined, {timeStyle: "short"}).slice(0, 4);
}

export const toTimeZoneNew = (newDate: Date, timeZone: string): string => {
    const date = new Date(newDate)
    return date.toLocaleString(undefined, {timeZone, timeZoneName: "short"});
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