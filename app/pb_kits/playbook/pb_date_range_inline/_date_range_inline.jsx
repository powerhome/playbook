/* @flow */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'
import { Body, Icon } from '../'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type DateRangeInlineProps = {
  className?: string,
  data?: string,
  endDate?: date,
  id?: string,
  startDate?: date,
}

const dateTimestamp = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return `${date.toDay()} ${date.toMonth()} ${date.toYear()}`
}

const dateTimeIso = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return date.toIso()
}

const DateRangeInline = (props: DateRangeInlineProps) => {
  const { endDate, startDate } = props
  return (
    <div className={classnames('pb_date_range_inline', globalProps(props))}>
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
        <time dateTime={dateTimeIso(startDate)}>
          {` ${dateTimestamp(
          startDate
        )} `}
        </time>
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
        <time dateTime={dateTimeIso(endDate)}>
          {` ${dateTimestamp(
          endDate
        )} `}
        </time>
      </Body>
    </div>
  )
}

export default DateRangeInline
