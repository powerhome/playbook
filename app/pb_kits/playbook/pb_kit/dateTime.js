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
  constructor({ value, zone = 'America/New_York' }: DateTimeType) {
    this.value = this.convertToTimestampZone(value, zone)
  }

  convertToTimestampZone(value, zone) {
    return moment(value).tz(zone)
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
