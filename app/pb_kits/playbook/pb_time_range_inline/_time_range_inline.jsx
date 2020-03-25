/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption, Icon } from '../'
import DateTime from '../pb_kit/dateTime.js'

type TimeRangeInlineProps = {
  className?: String,
  id?: String,
  data?: String,
  //alignment?: 'left' | 'center' | 'vertical',
  size?: 'sm' | 'xs',
  dark?: Boolean,
  icon?: Boolean,
  timezone?: Boolean,
  startTime: String,
  endTime: String
}

const timezoneString = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return `${date.convertToTimezone()}`
}

const dateTimestamp = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return `${date.toHour()}:${date.toMinute()}${date.toMeridian()}`
}

const dateTimeIso = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return date.toIso()
}

const TimeRangeInline = ({
  className,
  //alignment = 'left',
  size = 'sm',
  dark = false,
  icon = false,
  timezone = false,
  startTime,
  endTime,
}: TimeRangeInlineProps) => {
  const separator = `${' — '}`

  return (
    <div className={classnames('pb_time_range_inline_kit', className)}>
      <If condition={icon}>
        <Icon
            dark={dark}
            fixedWidth
            icon="clock"
            tag="span"
        />
      </If>
      <If condition={size == 'xs'}>
        <Caption
            dark={dark}
            tag="span"
        >
          <time dateTime={dateTimeIso(startTime)}>{` ${dateTimestamp(startTime)} `}</time>
        </Caption>
        {separator}
        <Caption
            dark={dark}
            tag="span"
        >
          <time dateTime={dateTimeIso(endTime)}>{` ${dateTimestamp(endTime)} `}</time>
          <If condition={timezone}>
            {timezoneString(endTime)}
          </If>
        </Caption>
      </If>
      <If condition={size == 'sm'}>
        <Body
            dark={dark}
            tag="span"
        >
          <time dateTime={dateTimeIso(startTime)}>{` ${dateTimestamp(startTime)} `}</time>
        </Body>
        {separator}
        <Body
            dark={dark}
            tag="span"
        >
          <time dateTime={dateTimeIso(endTime)}>{` ${dateTimestamp(endTime)} `}</time>
        </Body>
        <If condition={timezone}>
          <Body
              color="light"
              dark={dark}
              tag="span"
          >
            {timezoneString(endTime)}
          </Body>
        </If>
      </If>
    </div>
  )
}

export default TimeRangeInline
