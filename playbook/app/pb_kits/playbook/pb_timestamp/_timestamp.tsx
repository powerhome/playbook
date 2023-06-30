import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import { toMonth, toDay, toMinute, toHour, toMeridiem, toTimeZone, toYear } from '../pb_kit/dateTime'

import Caption from '../pb_caption/_caption'

type TimestampProps = {
  align?: "left" | "center" | "right",
  aria?: { [key: string]: string },
  className?: string | string[],
  dark?: boolean,
  data?: string,
  text: string,
  timestamp: Date,
  timezone: string,
  id?: string,
  showDate?: boolean,
  showUser?: boolean,
  hideUpdated?: boolean,
  showTimezone?: boolean,
  variant?: "default" | "elapsed" | "updated"
}

const Timestamp = (props: TimestampProps): React.ReactElement => {
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
    hideUpdated = false,
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
  const dateDisplay = `${toMonth(timestamp, timezone)} ${toDay(timestamp, timezone)}`
  const shouldShowUser = showUser == true && text.length > 0
  const shouldShowTimezone = showTimezone == true && timezone.length > 0
  const updatedText = hideUpdated ? "" : "Last updated"
  const userDisplay = shouldShowUser ? ` by ${text}` : ''

  let timeDisplay = `${toHour(timestamp, timezone)}:${toMinute(timestamp, timezone)}${toMeridiem(timestamp, timezone)}`

  const fullTimeDisplay = () => {
    if (shouldShowTimezone) {
      timeDisplay = `${timeDisplay} ${toTimeZone(timestamp, timezone)}`
    }
    return timeDisplay
  }

  const fullDateDisplay = () => {
    let fullDisplay = `${toMonth(timestamp, timezone)} ${toDay(timestamp, timezone)}`
    if (toYear(timestamp, timezone).toString() !== currentYear) {
      fullDisplay = `${fullDisplay}, ${toYear(timestamp, timezone)}`
    }
    return `${fullDisplay} ${' \u00b7 '} ${fullTimeDisplay()}`
  }

  const formatUpdatedString = () => {
    return `Last updated ${userDisplay} on ${dateDisplay} at ${timeDisplay}`
  }

  const formatElapsedString = () => {
    return `${updatedText} ${userDisplay} ${dateTimestamp.value.fromNow()}`
  }

  const captionText = () => {
    switch (variant) {
    case 'updated':
      return formatUpdatedString()
    case 'elapsed':
      return formatElapsedString()
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
