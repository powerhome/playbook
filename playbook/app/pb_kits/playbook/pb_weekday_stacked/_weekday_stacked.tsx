/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import Caption from '../pb_caption/_caption'
import Title from '../pb_title/_title'
import DateTime from '../pb_kit/dateTime';

type WeekdayStackedProps = {
  align?: "left" | "center" | "right",
  aria?: {[key:string]:string },
  className?: string,
  dark?: boolean,
  data?: Record<string, unknown>,
  date: Date,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  variant?: "day_only" | "month_day" | "expanded",
  compact?: boolean,
}

const getDayOfWeek = (value: Date, compact: boolean) => {
  if (compact) {
    return DateTime.toDayAbbr(value)
  } else {
    return DateTime.toWeekday(value)
  }
}

const getFormattedDate = (value: Date, variant: "day_only" | "month_day" | "expanded")  => {
  if (variant === 'day_only') {
    return DateTime.toDay(value).toString()
  } else {
    const format = variant === 'expanded' ? 'expanded' : 'month_day'
    return DateTime.toCustomFormat(value, format)
  }
}

const WeekdayStacked = (props: WeekdayStackedProps): React.ReactElement => {
  const {
    align = 'left',
    aria = {},
    className,
    dark = false,
    data = {},
    date = new Date(),
    htmlOptions = {},
    id,
    variant = 'month_day',
    compact = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_weekday_stacked_kit', align),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
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
