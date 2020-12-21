/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Caption } from '../'
import { globalProps } from '../utilities/globalProps.js'

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
  const timeDisplay = `${dateTimestamp.toHour()}:${dateTimestamp.toMinute()}${dateTimestamp.toMeridian()}`

  const fullTimeDisplay = (dateTimestamp, timeDisplay, timezone, showTimezone) => {
    if (showTimezone == true && timezone.length > 0) {
      timeDisplay = timeDisplay + ' ' + dateTimestamp.toTimezone()
    }
    return timeDisplay
  }

  const fullDateDisplay = (dateTimestamp, currentYear, timezone, showTimezone) => {
    let fullDisplay = `${dateTimestamp.toMonth()} ${dateTimestamp.toDay()}`
    if (dateTimestamp.toYear() > currentYear) {
      fullDisplay = `${fullDisplay}, ${dateTimestamp.toYear()}`
    }
    return `${fullDisplay} ${' \u00b7 '} ${fullTimeDisplay(dateTimestamp, timeDisplay, timezone, showTimezone)}`
  }

  const formattedUpdatedString = (showUser, text, dateTimestamp, timeDisplay) => {
    switch (variant) {
    case 'elapsed': {
      const elapsedUserDisplay = (showUser == true && text.length > 0) ? ` by ${text}` : ''
      return `Last updated ${elapsedUserDisplay} ${dateTimestamp.value.fromNow()}`
    }
    case 'updated': {
      const updatedUserDisplay = (showUser == true && text.length > 0) ? ` by ${text}` : ''
      return `Last updated ${updatedUserDisplay} on ${dateDisplay} at ${timeDisplay}`
    }
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
    >
      <div className="pb_timestamp_kit">
        <If condition={variant == 'updated' || variant == 'elapsed'}>
          <Caption
              dark={dark}
              size="xs"
              text={formattedUpdatedString(showUser, text, dateTimestamp, timeDisplay)}
          />
          <Else />
          <If condition={showDate == true}>
            <Caption
                dark={dark}
                size="xs"
                text={timestamp ? fullDateDisplay(dateTimestamp, currentYear, dateDisplay, timezone, showTimezone) : text}
            />
          </If>
          <If condition={showDate == false}>
            <Caption
                dark={dark}
                size="xs"
                text={fullTimeDisplay(dateTimestamp, timeDisplay, timezone, showTimezone)}
            />
          </If>
        </If>
      </div>
    </div>
  )
}

export default Timestamp
