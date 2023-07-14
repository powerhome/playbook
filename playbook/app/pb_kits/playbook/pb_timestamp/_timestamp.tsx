import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import DateTime from '../pb_kit/dateTime';


import Caption from '../pb_caption/_caption'

type TimestampProps = {
  align?: "left" | "center" | "right",
  aria?: { [key: string]: string },
  className?: string | string[],
  dark?: boolean,
  data?: string,
  text: string,
  timestamp: Date | string,
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
    timezone,
    timestamp,
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

  const timeStamp = new Date(timestamp)
  const currentYear = new Date().getFullYear().toString()
  const dateDisplay = `${DateTime.toMonth(timeStamp, timezone)} ${DateTime.toDay(timeStamp, timezone)}`
  const shouldShowUser = showUser == true && text.length > 0
  const shouldShowTimezone = showTimezone == true && timezone.length > 0
  const updatedText = hideUpdated ? "" : "Last updated"
  const userDisplay = shouldShowUser ? ` by ${text}` : ''

  let timeDisplay = `${DateTime.toHour(timeStamp, timezone)}:${DateTime.toMinute(timeStamp, timezone)}${DateTime.toMeridiem(timeStamp, timezone)}`

  const fullTimeDisplay = () => {
    if (shouldShowTimezone) {
      timeDisplay = `${timeDisplay} ${DateTime.toTimeZone(timeStamp, timezone)}`
    }
    return timeDisplay
  }

  const fullDateDisplay = () => {
    let fullDisplay = `${DateTime.toMonth(timeStamp, timezone)} ${DateTime.toDay(timeStamp, timezone)}`
    if (DateTime.toYear(timeStamp, timezone).toString() !== currentYear) {
      fullDisplay = `${fullDisplay}, ${DateTime.toYear(timeStamp, timezone)}`
    }
    return `${fullDisplay} ${' \u00b7 '} ${fullTimeDisplay()}`
  }

  const formatUpdatedString = () => {
    return `Last updated ${userDisplay} on ${dateDisplay} at ${timeDisplay}`
  }

  const formatElapsedString = () => {
    return `${updatedText} ${userDisplay} ${DateTime.fromNow(timeStamp)}`
  }

  const captionText = () => {
    switch (variant) {
    case 'updated':
      return formatUpdatedString()
    case 'elapsed':
      return formatElapsedString()
    default:
      return showDate ? timeStamp ? fullDateDisplay() : text : fullTimeDisplay()
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
