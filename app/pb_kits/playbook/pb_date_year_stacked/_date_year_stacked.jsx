/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'

import {
  Body,
  Title,
} from '../'

type DateYearStackedProps = {
  align?: 'center' | 'right',
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
}

const kitClasses = ({align='left'}: DateYearStackedProps) => {
  let classname = 'pb_date_year_stacked'
  classname += `_${align}`
  return classname
}

const DateYearStacked = ({
  align,
  className,
  dark=false,
  date,
}: DateYearStackedProps) => {
  const dateTimestamp = new DateTime({ value: date })

  const css = classnames(kitClasses({align}), className)

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
