/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { Body } from '../'

type TimeStackedProps = {
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
  align?: 'left' | 'center' | 'right',
}

const TimeStacked = ({
  className,
  dark = false,
  date,
  align = 'left',
}: TimeStackedProps) => {
  const classes = classnames(className, buildCss('pb_time_stacked_kit', align, {
    'dark': dark,
  }))

  const dateTimestamp = new DateTime({ value: date })

  return (
    <div className={classes}>
      <div className="pb_time_stacked_day_month">
        <Body
            color="light"
            text={dateTimestamp.toTimeWithMeridian()}
        />
        <Body
            color="light"
            text={dateTimestamp.toTimezone()}
        />
      </div>
    </div>
  )
}

export default TimeStacked
