/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildCss,
} from '../utilities/props'

import {
  Caption,
  Title,
} from '../'

import DateTime from '../pb_kit/dateTime.js'

type WeekdayStackedProps = {
  align?: 'left' | 'center' | 'right',
  className?: String,
  compact?: Boolean,
  dark?: Boolean,
  date: Date,
  dayOnly?: Boolean,
  id?: String,
}

const getDayOfWeek = (date, compact) => {
  const dateTime = new DateTime({ value: date })
  if (compact) {
    return dateTime.toDayAbbr()
  } else {
    return dateTime.toWeekday()
  }
}

const getFormattedDate = (date, dayOnly) => {
  const dateTime = new DateTime({ value: date })
  if (dayOnly) {
    return dateTime.toDay()
  } else {
    return `${dateTime.toMonthNum()}/${dateTime.toDay()}`
  }
}

const WeekdayStacked = ({
  align = 'left',
  className,
  compact = false,
  dark = false,
  date = new Date(),
  dayOnly = false,
}: WeekdayStackedProps) => (
  <div
      className={classnames(buildCss('pb_weekday_stacked_kit', align), className)}
  >
    <Caption dark={dark}>{getDayOfWeek(date, compact)}</Caption>
    <Title
        dark={dark}
        size={4}
        tag="span"
        text={getFormattedDate(date, dayOnly)}
    />
  </div>
)

export default WeekdayStacked
