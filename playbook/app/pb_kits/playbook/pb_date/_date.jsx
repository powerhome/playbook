/* @flow */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'
import { Icon } from '../'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

const defaultDateString = (value: DateTime) => {
  const weekday = value.toWeekday().toUpperCase()
  const month = value.toMonth().toUpperCase()
  const day = value.toDay()

  return `${weekday} · ${month} ${day}`
}

const largeDateString = (value: DateTime) => {
  const month = value.toMonth().toUpperCase()
  const day = value.toDay()

  return `${month} ${day}`
}

type DateSubcomponent = {
  value: DateTime,
}

const ExtraSmallDate = ({ value, ...props }: DateSubcomponent) => (
  <h3 className={classnames('pb_title_kit_4', globalProps(props))}>
    {defaultDateString(value)}
  </h3>
)

const SmallDate = ({ value, ...props }: DateSubcomponent) => (
  <h3 className={classnames('pb_title_kit_4', globalProps(props))}>
    <Icon
        fixedWidth
        icon="calendar"
    />
    {defaultDateString(value)}
  </h3>
)

const LargeDate = ({ value, ...props }: DateSubcomponent) => (
  <h3 className={classnames('pb_title_kit_3', globalProps(props))}>
    {largeDateString(value)}
  </h3>
)

type PbDateProps = {
  size?: "xs" | "sm" | "lg",
  value?: string,
  className?: string
}

const PbDate = ({ size, value, className, ...props }: PbDateProps) => {
  const date = new DateTime({ value: value })

  if (size == 'xs')
    return (
      <ExtraSmallDate
          {...props}
          className={className}
          value={date}
      />
    )
  if (size == 'lg')
    return (
      <LargeDate
          {...props}
          className={className}
          value={date}
      />
    )
  return (
    <SmallDate
        {...props}
        className={className}
        value={date}
    />
  )
}

export default PbDate
