/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../utilities/props'
import DateTime from '../pb_kit/dateTime.js'

import {
  Body,
  Title,
} from '../'

type DateYearStackedProps = {
  align?: 'left' | 'center' | 'right',
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
}

const DateYearStacked = ({
  align = 'left',
  className,
  dark = false,
  date,
}: DateYearStackedProps) => {
  const dateTimestamp = new DateTime({ value: date })
  const css = classnames(className, buildCss('pb_date_year_stacked', align))

  return (
    <div className={css}>
      <Title
          dark={dark}
          size={4}
          text={`${dateTimestamp.toDay()} ${dateTimestamp.toMonth().toUpperCase()}`}
      />
      <Body color="light">{ dateTimestamp.toYear() }</Body>
    </div>
  )
}

export default DateYearStacked
