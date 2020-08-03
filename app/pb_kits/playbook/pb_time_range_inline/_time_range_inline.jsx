/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption, Icon } from '../'
import DateTime from '../pb_kit/dateTime.js'
import { globalProps } from '../utilities/globalProps.js'

type TimeRangeInlineProps = {
  className?: String,
  id?: String,
  data?: String,
  alignment?: "left" | "center" | "vertical",
  size?: "sm" | "xs",
  dark?: Boolean,
  icon?: Boolean,
  timezone?: Boolean,
  startTime: String,
  endTime: String,
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

const TimeRangeInline = (props: TimeRangeInlineProps) => {
  const {
    className,
    alignment = 'left',
    size = 'sm',
    dark = false,
    icon = false,
    timezone = false,
    startTime,
    endTime,
  } = props
  const separator = `${'—'}`

  const iconContent = () => {
    return (
      <If condition={icon}>
        <Icon
            className="pb_time_range_inline_icon"
            dark={dark}
            fixedWidth
            icon="clock"
            size={size}
            tag="span"
        />
      </If>
    )
  }

  return (
    <div
        className={classnames('pb_time_range_inline_kit_' + alignment, className, globalProps(props))}
    >
      <div className="pb_time_range_inline_wrapper">
        <If condition={size == 'xs'}>
          <Caption
              dark={dark}
              tag="span"
          >
            {iconContent()}
            <time dateTime={dateTimeIso(startTime)}>
              {` ${dateTimestamp(
              startTime
            )} `}
            </time>
          </Caption>
          <Caption
              className="pb_time_range_inline_dash"
              dark={dark}
              tag="span"
          >
            {separator}
          </Caption>
          <Caption
              dark={dark}
              tag="span"
          >
            <time dateTime={dateTimeIso(endTime)}>
              {` ${dateTimestamp(
              endTime
            )} `}
            </time>
          </Caption>
          <If condition={timezone}>
            <Caption
                className="pb_time_range_inline_timezone"
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
            {iconContent()}
            <time dateTime={dateTimeIso(startTime)}>
              {` ${dateTimestamp(
              startTime
            )} `}
            </time>
          </Body>
          <Body
              className="pb_time_range_inline_dash"
              dark={dark}
              tag="span"
          >
            {separator}
          </Body>
          <Body
              dark={dark}
              tag="span"
          >
            <time dateTime={dateTimeIso(endTime)}>
              {` ${dateTimestamp(
              endTime
            )} `}
            </time>
          </Body>
          <If condition={timezone}>
            <Body
                className="pb_time_range_inline_timezone"
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
