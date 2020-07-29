/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { Caption, Title } from '../'
import { systemProps } from '../utilities/systemProps.js'

type DateStackedProps = {
  align?: "left" | "center" | "right",
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  size?: "sm" | "md",
  id?: String,
  reverse?: Boolean,
}

const sizes = {
  sm: 4,
  md: 3,
}

const DateStacked = (props: DateStackedProps) => {
  const {
    align = 'left',
    reverse = false,
    className,
    dark = false,
    date,
    size = 'sm',
  } = props
  const classes = classnames(
    className,
    buildCss('pb_date_stacked_kit', align, size, {
      dark: dark,
      reverse: reverse,
    }),
    systemProps(props)
  )

  const currentYear = new Date().getFullYear().toString()
  const dateTimestamp = new DateTime({ value: date })
  const inputYear = dateTimestamp.toYear().toString()

  return (
    <div className={classes}>
      <div className="pb_date_stacked_day_month">
        <Caption text={dateTimestamp.toMonth().toUpperCase()} />
        <Title
            dark={dark}
            size={sizes[size]}
            text={dateTimestamp.toDay()}
        />
      </div>
      <If condition={currentYear != inputYear}>
        <Caption size="xs">{inputYear}</Caption>
      </If>
    </div>
  )
}

export default DateStacked
