/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { Caption } from '../'
import { globalProps } from '../utilities/globalProps.js'

type TimestampProps = {
  align?: "left" | "center" | "right",
  className?: string | array<string>,
  dark?: boolean,
  data?: string,
  timestamp: string,
  id?: string,
  name?: string,
  showDate?: boolean,
  showUser?: boolean,
  variant?: "default" | "elapsed" | "updated"
}

const Timestamp = (props: TimestampProps) => {
  const {
    align = 'left',
    className,
    dark = false,
    timestamp,
    name,
    showDate = true,
    showUser = false,
    variant = 'default',
  } = props
  const classes = classnames(
    buildCss('pb_timestamp_kit', align, {
      dark: dark,
      variant: variant,
    }),
    globalProps(props),
    className
  )

  const currentYear = new Date().getFullYear().toString()
  const dateTimestamp = new DateTime({ value: timestamp })
  const timeDisplay = dateTimestamp.toHour() + ':' + dateTimestamp.toMinute() + dateTimestamp.toMeridian()
  const dateDisplay = dateTimestamp.toMonth() + ' ' + dateTimestamp.toDay()

  var fullDateDisplay = function fullDateDisplay(dateTimestamp, currentYear, dateDisplay, timeDisplay) {
    var fullDisplay = dateDisplay
    if (dateTimestamp.toYear() > currentYear) {
      fullDisplay = fullDisplay + ', ' + dateTimestamp.toYear().toString()
    }
    return fullDisplay + ' ' + timeDisplay
  }

  var fullElapsedDisplay = function fullElapsedDisplay(){
    return 'Elapsed Display'
  }

  var fullUpdatedDisplay = function fullUpdatedDisplay(showUser, name, timeDisplay){
    var userDisplay = (showUser == 'true' && name.length > 0) ? ' by ' + name : ''
    return 'Last updated' + userDisplay + ' at ' + timeDisplay
  }

  return (
    <div className={classes}>
      <div className="pb_timestamp_kit">
        <If condition={variant == 'updated'}>
          <Caption
              size="xs"
              text={fullUpdatedDisplay(showUser, name, timeDisplay)}
          />
        </If>
        <If condition={variant == 'elapsed'}>
          <Caption
              size="xs"
              text={fullElapsedDisplay()}
          />
        </If>
        <If condition={variant == 'default'}>
          <If condition={showDate == 'true'}>
            <Caption
                size="xs"
                text={fullDateDisplay(dateTimestamp, currentYear, dateDisplay, timeDisplay)}
            />
          </If>
          <If condition={showDate == 'false'}>
            <Caption
                size="xs"
                text={timeDisplay}
            />
          </If>
        </If>
      </div>
    </div>
  )
}

export default Timestamp
