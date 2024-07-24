import React from 'react'
import classnames from 'classnames'

import { globalProps, GlobalProps } from '../utilities/globalProps'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import DateTime from '../pb_kit/dateTime';

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

type TimeRangeInlineProps = {
  aria?: { [key: string]: string },
  className?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  data?: { [key: string]: string },
  alignment?: "left" | "center" | "vertical",
  size?: "sm" | "xs",
  dark?: boolean,
  icon?: boolean,
  timezone?: boolean,
  startTime: Date,
  endTime: Date,
} & GlobalProps

const timezoneString = (dateValue: Date) => {
  return `${DateTime.toTimeZone(dateValue)}`
}

const dateTimestamp = (dateValue: Date) => {
  return `${DateTime.toHour(dateValue)}:${DateTime.toMinute(dateValue)}${DateTime.toMeridiem(dateValue)}`
}

const dateTimeIso = (dateValue: Date) => {
  return DateTime.toIso(dateValue)
}

const TimeRangeInline = (props: TimeRangeInlineProps) => {
  const {
    aria = {},
    className,
    data = {},
    alignment = 'left',
    htmlOptions = {},
    size = 'sm',
    dark = false,
    icon = false,
    timezone = false,
    startTime,
    endTime,
    id,
  } = props

  const dataProps: { [key: string]: string } = buildDataProps(data)
  const ariaProps: { [key: string]: string } = buildAriaProps(aria)
  const htmlProps = buildHtmlProps(htmlOptions)

  const separator = (
    <Body color="light">
      <Icon
          className="pb_time_range_inline_arrow"
          dark={dark}
          fixedWidth
          icon="long-arrow-right"
      />
    </Body>
  )

  const iconContent = () => {
    return (
      icon &&
      <Body
          color="light"
          tag="span"
      >
        <Icon
            className="pb_time_range_inline_icon"
            dark={dark}
            fixedWidth
            icon="clock"
            size={size}
            tag="span"
        />
      </Body>
    )
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classnames('pb_time_range_inline_kit_' + alignment, globalProps(props), className)}
        id={id}
    >
      <div className="pb_time_range_inline_wrapper">
        {size == 'xs' &&
          <>
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
                className="pb_time_range_inline_arrow"
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
            {timezone &&
              <Caption
                  className="pb_time_range_inline_timezone"
                  dark={dark}
                  tag="span"
              >
                {timezoneString(endTime)}
              </Caption>
            }
          </>
        }
        {size == 'sm' &&
          <>
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
                className="pb_time_range_inline_arrow"
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
            {timezone &&
              <Body
                  className="pb_time_range_inline_timezone"
                  color="light"
                  dark={dark}
                  tag="span"
              >
                {timezoneString(endTime)}
              </Body>
            }
          </>
        }
      </div>
    </div>
  )
}

export default TimeRangeInline
