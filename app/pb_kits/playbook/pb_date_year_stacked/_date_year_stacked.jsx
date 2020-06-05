/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import DateTime from '../pb_kit/dateTime.js'
import { spacing } from '../utilities/spacing.js'

import { Body, Title } from '../'

type DateYearStackedProps = {
  align?: "left" | "center" | "right",
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
}

const DateYearStacked = (props: DateYearStackedProps) => {
  const { align = 'left', className, dark = false, date } = props
  const dateTimestamp = new DateTime({ value: date })
  const css = classnames(className, buildCss('pb_date_year_stacked', align), spacing(props))

  return (
    <div className={css}>
      <Title
          dark={dark}
          size={4}
          text={`${dateTimestamp.toDay()} ${dateTimestamp
          .toMonth()
          .toUpperCase()}`}
      />
      <Body color="light">{dateTimestamp.toYear()}</Body>
    </div>
  )
}

export default DateYearStacked
