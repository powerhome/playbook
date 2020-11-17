/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { Body, Caption } from '../'
import { deprecatedProps, globalProps } from '../utilities/globalProps.js'

type TimeStackedProps = {
  className?: string | array<string>,
  dark?: boolean,
  data?: string,
  date: string,
  id?: string,
  align?: "left" | "center" | "right",
  tag?: "body" | "caption",
}

const TimeStacked = (props: TimeStackedProps) => {
  const { align, className, dark, date, tag } = props
  deprecatedProps("TimeStacked", ["tag"])
  const classes = classnames(
    buildCss('pb_time_stacked_kit', align),
    globalProps(props),
    className,
  )

  const dateTimestamp = new DateTime({ value: date })

  return (
    <div className={classes}>
      <div
        align={align}
        className="pb_time_stacked_day_month"
      >
        <Body
          dark={dark}
          color="light"
          text={dateTimestamp.toTimeWithMeridian()}
        />
        <Caption
          dark={dark}
          color="light"
          text={dateTimestamp.toTimezone()}
        />
      </div>
    </div>
  )
}

export default TimeStacked
