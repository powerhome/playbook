/* @flow */
/*eslint-disable flowtype/space-before-type-colon */

import moment from 'moment'
require('moment-strftime')
require('moment-timezone')

type DateTimeType = {
  value: String | Date,
  zone?: String,
}

export default class DateTime {
  constructor({ value, zone = null }: DateTimeType) {
    this.value = this.convertToTimestampZone(value, zone)
  }

  convertToTimestampZone(value, zone) {
    return zone ? moment(value).tz(zone) : moment(value)
  }

  convertToTimezone() {
    return this.value.strftime('%a')
  }

  toYear() {
    return this.value.strftime('%Y')
  }

  toMonth() {
    return this.value.strftime('%b')
  }

  toMonthFull() {
    return this.value.strftime('%B')
  }

  toDay() {
    return this.value.strftime('%e')
  }

  toWeekday() {
    return this.value.strftime('%a')
  }

  toIso() {
    return this.value.toISOString()
  }
}
