/* @flow */

import React from 'react'
import classnames from 'classnames'
import DateTime from '../pb_kit/dateTime.js'

import {
  Title,
  Caption
} from '../'

type DateStackedProps = {
  align?: 'center' | 'right',
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  size?: 'sm' | 'md',
  id?: String,
  reverse?: Boolean,
}

const kitClasses = ({
  align='left',
  size='sm',
  dark=false,
  reverse=false,

}: DateStackedProps) => {
  const alignStyle = align !== '' ? `_${align}` : ''
  const sizeStyle = size !== '' ? `_${size}` : ''
  const themeStyle = dark === true ? '_dark' : ''
  const reverseStyle = reverse === true ? '_reverse' : ''
  return 'pb_date_stacked_kit' + alignStyle + sizeStyle + themeStyle + reverseStyle
}

const sizes = {
  sm: 4,
  md: 3,
}

const DateStacked = (props: DateStackedProps) => {
  const {
    className,
    dark=false,
    date,
    size='sm'
  } = props

  const dateTimestamp = new DateTime({ value: date })
  const css = classnames(kitClasses(props), className)

  const currentYear = new Date().getFullYear().toString()
  const inputYear = dateTimestamp.toYear().toString()

  const printYear = () => {
    if (currentYear != inputYear) {
      return (
        <Caption size='xs'>{inputYear}</Caption>
      )
    }
  }

  return (
    <div className={css}>
      <div className="pb_date_stacked_day_month">
        <Caption
            text={`${dateTimestamp.toMonth().toUpperCase()}`}
        />
        <Title
            dark={dark}
            size={sizes[size]}
            text={dateTimestamp.toDay()}
        />
      </div>
      {printYear(date)}
    </div>
  )
}

export default DateStacked
