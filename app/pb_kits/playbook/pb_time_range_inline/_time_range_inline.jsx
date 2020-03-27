/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption, Icon } from '../'
import DateTime from '../pb_kit/dateTime.js'

type TimeRangeInlineProps = {
  className?: String,
  id?: String,
  data?: String,
  alignment?: 'left' | 'center' | 'vertical',
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
  alignment = 'left',
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
      <div className={'align-' + alignment}>
        <If condition={icon}>
          <Icon
              className="space-right"
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
          <Caption
              className="dash"
              dark={dark}
              tag="span"
          >
            {separator}
          </Caption>
          <Caption
              dark={dark}
              tag="span"
          >
            <time dateTime={dateTimeIso(endTime)}>{` ${dateTimestamp(endTime)} `}</time>
          </Caption>
          <If condition={timezone}>
            <Caption
                dark={dark}
                tag="span"
            >
              {timezoneString(endTime)}
            </Caption>
          </If>
        </If>
        <If condition={size == 'sm'}>
          <Body
              dark={dark}
              tag="span"
          >
            <time dateTime={dateTimeIso(startTime)}>{` ${dateTimestamp(startTime)} `}</time>
          </Body>
          <Body
              className="dash"
              dark={dark}
              tag="span"
          >
            {separator}
          </Body>
          <Body
              dark={dark}
              tag="span"
          >
            <time dateTime={dateTimeIso(endTime)}>{` ${dateTimestamp(endTime)} `}</time>
          </Body>
          <If condition={timezone}>
            <Body
                className="space-left"
                color="light"
                dark={dark}
                tag="span"
            >
              {timezoneString(endTime)}
            </Body>
          </If>
        </If>
      </div>
    </div>
  )
}

export default TimeRangeInline
