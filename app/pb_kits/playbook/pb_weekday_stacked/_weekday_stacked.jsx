/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { buildCss } from '../utilities/props'

import { Caption, Title } from '../'

import DateTime from '../pb_kit/dateTime.js'

type WeekdayStackedProps = {
  align?: "left" | "center" | "right",
  className?: string,
  dark?: boolean,
  date: date,
  variant?: "day_only" | "month_day" | "expanded",
  compact?: boolean,
  id?: string,
}

const getDayOfWeek = (date, compact) => {
  const dateTime = new DateTime({ value: date })
  if (compact) {
    return dateTime.toDayAbbr()
  } else {
    return dateTime.toWeekday()
  }
}

const getFormattedDate = (date, variant) => {
  const dateTime = new DateTime({ value: date })
  if (variant === 'day_only') {
    return dateTime.toDay()
  } else {
    const format = variant === 'expanded' ? '%b %-d' : '%-m/%-d'
    return dateTime.toCustomFormat(format)
  }
}

const WeekdayStacked = (props: WeekdayStackedProps) => {
  const {
    align = 'left',
    className,
    dark = false,
    date = new Date(),
    variant = 'month_day',
    compact = false,
  } = props
  return (
    <div
        className={classnames(
        buildCss('pb_weekday_stacked_kit', align),
        className,
        globalProps(props)
      )}
    >
      <Caption dark={dark}>{getDayOfWeek(date, compact)}</Caption>
      <Title
          dark={dark}
          size={4}
          tag="span"
          text={getFormattedDate(date, variant)}
      />
    </div>
  )
}

export default WeekdayStacked
