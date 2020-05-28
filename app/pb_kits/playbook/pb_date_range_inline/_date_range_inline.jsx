/* @flow */

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
  const date = new DateTime({ value: dateValue })
  return `${date.toDay()} ${date.toMonth()} ${date.toYear()}`
}

const dateTimeIso = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return date.toIso()
}

const DateRangeInline = ({
  endDate,
  startDate,
}: DateRangeInlineProps) => (
  <div>
    <Body
        color="light"
        tag="span"
    >
      <Icon
          fixedWidth
          icon="calendar-alt"
      />
    </Body>
    <Body tag="span">
      <time dateTime={dateTimeIso(startDate)}>{` ${dateTimestamp(startDate)} `}</time>
    </Body>
    <Body
        color="light"
        tag="span"
    >
      <Icon
          fixedWidth
          icon="long-arrow-right"
      />
    </Body>
    <Body tag="span">
      <time dateTime={dateTimeIso(endDate)}>{` ${dateTimestamp(endDate)} `}</time>
    </Body>
  </div>
)

export default DateRangeInline
