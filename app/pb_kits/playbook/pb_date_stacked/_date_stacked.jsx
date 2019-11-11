/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'

import {
  Body,
  Title,
  Caption
} from '../'

type DateStackedProps = {
  className?: String | Array<String>,
  data?: String,
  id?: String,
  date: String,
  align?: 'center' | 'right',
  size?: 'sm' | 'md',
  reverse?: Boolean,
  dark?: Boolean
}

const kitClasses = ({align='left', size='sm'}: DateStackedProps) => {
  let classname = 'pb_date_stacked_kit'
  classname += `_${align}`
  classname += `_${size}`
  return classname
}

const is_not_same_year = (input_date) => {
  current_year = new Date().getFullYear()
  if (current_year != input_date.toYear()) {
    return (
      <div class="pb_date_stacked_year">
        <Body color="light">{ dateTimestamp.toYear() }</Body>
      </div>
    )
  }
  else {
    return null;
  }
}

const sizes = {
  sm: 4,
  md: 3,
}

const DateStacked = (props: DateStackedProps) => {
  const {
    align,
    size='sm',
    className,
    dark=false,
    date,
  } = props

  const dateTimestamp = new DateTime({ value: date })
  const css = classnames(kitClasses({align, size}), className)
  const inputYear = is_not_same_year({date})

  return (
    <div className={css}>
      <div class="pb_date_stacked_day_month">
        <Caption
          text={`${dateTimestamp.toMonth().toUpperCase()}`}/>
        <Title
          dark={dark}
          size={sizes[size]}
          text={`${dateTimestamp.toDay()}`}/>
        {inputYear}
      </div>

    </div>
  )
}

export default DateStacked
