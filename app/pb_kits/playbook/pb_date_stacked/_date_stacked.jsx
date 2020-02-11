/* @flow */

import React from 'react'
import classnames from 'classnames'
import moment from 'moment'

import { buildCss } from '../utilities/props'
import { Caption, Title } from '../'

type DateStackedProps = {
  align?: 'left' | 'center' | 'right',
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  size?: 'sm' | 'md',
  id?: String,
  reverse?: Boolean,
}

const sizes = {
  sm: 4,
  md: 3,
}

const DateStacked = ({
  align = 'left',
  reverse = false,
  className,
  dark = false,
  date,
  size = 'sm',
}: DateStackedProps) => {
  const classes = classnames(className, buildCss('pb_date_stacked_kit', align, size, {
    'dark': dark,
    'reverse': reverse,
  }))

  const currentYear = moment().year()
  const dateObject = moment(date)
  const inputYear = dateObject.format('Y')

  return (
    <div className={classes}>
      <div className="pb_date_stacked_day_month">
        <Caption
            text={dateObject.format('MMM').toUpperCase()}
        />
        <Title
            dark={dark}
            size={sizes[size]}
            text={dateObject.format('D')}
        />
      </div>
      <If condition={currentYear != inputYear}>
        <Caption size="xs">{inputYear}</Caption>
      </If>
    </div>
  )
}

export default DateStacked
