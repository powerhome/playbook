/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { Caption } from '../'

type TimeStackedProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
}

const TimeStacked = ({
  className,
  dark = false,
  date,
}: TimeStackedProps) => {
  const classes = classnames(className, buildCss('pb_time_stacked_kit', {
    'dark': dark,
  }))

  const dateTimestamp = new DateTime({ value: date })

  return (
    <div className={classes}>
      <div className="pb_time_stacked_day_month">
        <Caption
            text={dateTimestamp.toTimeWithMeridian()}
        />
        <Caption
            text={dateTimestamp.toTimezone()}
        />
      </div>
    </div>
  )
}

export default TimeStacked
