/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'

import {
  Body,
  Icon,
} from '../'


type DateRangeInlineProps = {
  className?: String,
  data?: String,
  endDate?: Date,
  id?: String,
  startDate?: Date
}

const dateTimestamp = (dateValue) => {
  let date = new DateTime({ value: dateValue })
  return `${date.toDay()} ${date.toMonth()} ${date.toYear()}`
}

const dateTimeIso = (dateValue) => {
  let date = new DateTime({ value: dateValue })
  return date.toIso()
}

const DateRangeInline = ({
  className,
  data,
  endDate,
  id,
  startDate
}: DateRangeInlineProps) => (
  <div>
    <Body tag="span" color="light">
      <Icon icon="calendar-alt" fixedWidth="true" />
    </Body>
    <Body tag="span">
      <time dateTime={dateTimeIso(startDate)} >{` ${dateTimestamp(startDate)} `}</time>
    </Body>
    <Body tag="span" color="light">
      <Icon icon="long-arrow-right" fixedWidth="true" />
    </Body>
    <Body tag="span">
      <time dateTime={dateTimeIso(endDate)} >{` ${dateTimestamp(endDate)} `}</time>
    </Body>
  </div>
)

export default DateRangeInline
