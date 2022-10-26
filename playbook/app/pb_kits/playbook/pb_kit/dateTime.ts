
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

  toCustomFormat(format = '%-m/%-d') {
    return this.value.strftime(format)
  }

  toYear() {
    return this.value.strftime('%Y')
  }

  toMonth() {
    return this.value.strftime('%b')
  }

  toMonthNum() {
    return this.value.strftime('%-m')
  }

  toMonthFull() {
    return this.value.strftime('%B')
  }

  toDay() {
    return this.value.strftime('%e')
  }

  toDayAbbr() {
    return ABBR_DAYS[this.value.day()]
  }

  toWeekday() {
    return this.value.strftime('%a')
  }

  toHour() {
    return this.value.strftime('%l')
  }

  toMinute() {
    return this.value.strftime('%M')
  }

  toMeridian() {
    return this.value.strftime('%P')[0]
  }

  toIso() {
    return this.value.toISOString()
  }

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
