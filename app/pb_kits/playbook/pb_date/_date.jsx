/* @flow */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'
import { Icon } from '../'

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
  value: DateTime
}

const ExtraSmallDate = ({ value }: DateSubcomponent) => (
  <h3 className="pb_title_kit_4">{defaultDateString(value)}</h3>
)

const SmallDate = ({ value }: DateSubcomponent) => (
  <h3 className="pb_title_kit_4">
    <Icon
        fixedWidth
        icon="calendar"
    />
    {defaultDateString(value)}
  </h3>
)

const LargeDate = ({ value }: DateSubcomponent) => (
  <h3 className="pb_title_kit_3">{largeDateString(value)}</h3>
)

type PbDateProps = {
  size?: 'xs' | 'sm' | 'lg',
  value?: String,
}

const PbDate = ({
  size,
  value,
}: PbDateProps) => {
  const date = new DateTime({ value: value })

  if (size == 'xs') return <ExtraSmallDate value={date} />
  if (size == 'lg') return <LargeDate value={date} />
  return <SmallDate value={date} />
}

export default PbDate
