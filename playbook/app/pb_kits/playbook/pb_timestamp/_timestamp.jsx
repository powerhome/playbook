/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'

type TimestampProps = {
  align?: "left" | "center" | "right",
  aria?: object,
  className?: string | array<string>,
  dark?: boolean,
  data?: string,
  text: string,
  timestamp: string,
  timezone: string,
  id?: string,
  showDate?: boolean,
  showUser?: boolean,
  showTimezone?: boolean,
  variant?: "default" | "elapsed" | "updated"
}

const Timestamp = (props: TimestampProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    dark = false,
    data = {},
    text,
    timestamp,
    timezone,
    showDate = true,
    showUser = false,
    showTimezone = false,
    variant = 'default',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_timestamp_kit', align, {
      dark: dark,
      variant: variant,
    }),
    globalProps(props),
    className
  )

  const currentYear = new Date().getFullYear().toString()
  const dateTimestamp = new DateTime({ value: timestamp, zone: timezone })
  const dateDisplay = `${dateTimestamp.toMonth()} ${dateTimestamp.toDay()}`
  const shouldShowUser = showUser == true && text.length > 0
  const shouldShowTimezone = showTimezone == true && timezone.length > 0
  const userDisplay = shouldShowUser ? ` by ${text}` : ''

  let timeDisplay = `${dateTimestamp.toHour()}:${dateTimestamp.toMinute()}${dateTimestamp.toMeridian()}`

  const fullTimeDisplay = () => {
    if (shouldShowTimezone) {
      timeDisplay = `${timeDisplay} ${dateTimestamp.toTimezone()}`
    }
    return timeDisplay
  }

  const fullDateDisplay = () => {
    let fullDisplay = `${dateTimestamp.toMonth()} ${dateTimestamp.toDay()}`
    if (dateTimestamp.toYear() !== currentYear) {
      fullDisplay = `${fullDisplay}, ${dateTimestamp.toYear()}`
    }
    return `${fullDisplay} ${' \u00b7 '} ${fullTimeDisplay()}`
  }

  const formatUpdatedString = () => {
    return `Last updated ${userDisplay} on ${dateDisplay} at ${timeDisplay}`
  }

  const formatElapsedString = () => {
    return `Last updated ${userDisplay} ${dateTimestamp.value.fromNow()}`
  }

  const captionText = () => {
    switch (variant) {
    case 'updated':
      return formatUpdatedString(userDisplay, dateTimestamp)
    case 'elapsed':
      return formatElapsedString(userDisplay, timeDisplay)
    default:
      return showDate ? timestamp ? fullDateDisplay() : text : fullTimeDisplay()
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <div className="pb_timestamp_kit">
        <Caption
            dark={dark}
            size="xs"
            text={captionText()}
        />
      </div>
    </div>
  )
}

export default Timestamp
