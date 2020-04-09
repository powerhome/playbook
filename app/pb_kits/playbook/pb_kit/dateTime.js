/* @flow */
/*eslint-disable flowtype/space-before-type-colon */

import moment from 'moment'
require('moment-strftime')
require('moment-timezone')

type DateTimeType = {
  value: String | Date,
  zone?: String,
}

const ABBR_DAYS = ['SU', 'M', 'T', 'W', 'TH', 'F', 'S']

export default class DateTime {
  constructor({ value, zone = 'America/New_York' }: DateTimeType) {
    this.value = this.convertToTimestampZone(value, zone)
  }

  convertToTimestampZone(value, zone) {
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
    return this.value.strftime('%I:%M')
  }

  toTimezone() {
    return this.value.strftime('%Z')
  }

  toTimeWithMeridian() {
    return this.toTime() + this.toMeridian()
  }
}
