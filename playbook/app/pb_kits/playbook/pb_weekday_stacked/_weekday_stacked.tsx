/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import Caption from '../pb_caption/_caption'
import Title from '../pb_title/_title'

import { toWeekday, toDayAbbr, toDay, toCustomFormat } from '../pb_kit/dateTime'

type WeekdayStackedProps = {
  align?: "left" | "center" | "right",
  aria?: {[key:string]:string },
  className?: string,
  dark?: boolean,
  data?: object,
  date: Date,
  id?: string,
  variant?: "day_only" | "month_day" | "expanded",
  compact?: boolean,
}

const getDayOfWeek = (value: Date, compact: boolean) => {
  if (compact) {
    return toDayAbbr(value)
  } else {
    return toWeekday(value)
  }
}

const getFormattedDate = (value: Date, variant: "day_only" | "month_day" | "expanded")  => {
  if (variant === 'day_only') {
    return toDay(value).toString()
  } else {
    const format = variant === 'expanded' ? 'expanded' : 'month_day'
    return toCustomFormat(value, format)
  }
}

const WeekdayStacked = (props: WeekdayStackedProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    dark = false,
    data = {},
    date = new Date(),
    id,
    variant = 'month_day',
    compact = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_weekday_stacked_kit', align),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
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
