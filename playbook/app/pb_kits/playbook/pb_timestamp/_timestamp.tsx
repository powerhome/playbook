import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
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
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  showCurrentYear?: boolean,
  showDate?: boolean,
  showUser?: boolean,
  hideUpdated?: boolean,
  showTime?: boolean,
  showTimezone?: boolean,
  unstyled?: boolean,
  variant?: "default" | "elapsed" | "updated"
}

const Timestamp = (props: TimestampProps): React.ReactElement => {
  const {
    align = 'left',
    aria = {},
    className,
    dark = false,
    data = {},
    htmlOptions = {},
    text,
    timezone,
    timestamp,
    showCurrentYear = false,
    showDate = true,
    showUser = false,
    hideUpdated = false,
    showTime = true,
    showTimezone = false,
    unstyled = false,
    variant = 'default',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_timestamp_kit', align),
    globalProps(props),
    className
  )

  const currentYear = new Date().getFullYear().toString()
  const dateDisplay = `${DateTime.toMonth(timestamp, timezone)} ${DateTime.toDay(timestamp, timezone)}`
  const shouldShowUser = showUser == true && text.length > 0
  const shouldShowTimezone = showTimezone == true && timezone.length > 0
  const updatedText = hideUpdated ? "" : "Last updated"
  const userDisplay = shouldShowUser ? ` by ${text}` : ''

  let timeDisplay = `${DateTime.toHour(timestamp, timezone)}:${DateTime.toMinute(timestamp, timezone)}${DateTime.toMeridiem(timestamp, timezone)}`

  const fullTimeDisplay = () => {
    if (shouldShowTimezone) {
      timeDisplay = `${timeDisplay} ${DateTime.toTimeZone(timestamp, timezone)}`
    }
    return timeDisplay
  }

  const baseDateDisplay = () => {
  let display = `${DateTime.toMonth(timestamp, timezone)} ${DateTime.toDay(timestamp, timezone)}`
  if (DateTime.toYear(timestamp, timezone).toString() !== currentYear || showCurrentYear) {
    display = `${display}, ${DateTime.toYear(timestamp, timezone)}`
  }
  return display
}

  const fullDateDisplay = () => {
    const fullDisplay = baseDateDisplay()
    return showTime ? `${fullDisplay} ${' \u00b7 '} ${fullTimeDisplay()}` : fullDisplay
  }

  const formatUpdatedString = () => {
    return `Last updated ${userDisplay} on ${dateDisplay} at ${timeDisplay}`
  }

  const formatElapsedString = () => {
    return `${updatedText} ${userDisplay} ${DateTime.fromNow(timestamp)}`
  }

  const timestampText = () => {
    switch (variant) {
    case 'updated':
      return formatUpdatedString()
    case 'elapsed':
      return formatElapsedString()
    default:
      if (showDate && showTime) return timestamp ? fullDateDisplay() : text
      if (showDate && !showTime) return baseDateDisplay()
      if (!showDate && showTime) return fullTimeDisplay()
      return text
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
    >
      <div className="pb_timestamp_kit">
        {unstyled ? (
          <div>
            {timestampText()}
          </div>
        ) : (
          <Caption
              dark={dark}
              size="xs"
              text={timestampText()}
          />
        )}
      </div>
    </div>
  )
}

export default Timestamp
