/* @flow */

import React from 'react';
import DateTime from '../pb_kit/dateTime.js'
import moment from 'moment'
import {Icon} from '../'

type DateProps = {
  size?: 'xs' | 'sm' | 'lg',
  value?: String,
}


const defaultDateString = value => {
  const weekday = value.toWeekday().toUpperCase()
  const month = value.toMonth().toUpperCase()
  const day = value.toDay()

  return `${weekday} · ${month} ${day}`
}

const largeDateString = value => {
  const month = value.toMonth().toUpperCase()
  const day = value.toDay()

  return `${month} ${day}`
}


const ExtraSmallDate = ({ value }) => (
  <h3 className='pb_title_kit_4'>{defaultDateString(value)}</h3>
)

const SmallDate = ({ value }) => (
  <h3 className='pb_title_kit_4'><Icon icon="calendar" fixedWidth="true" />{defaultDateString(value)}</h3>
)

const LargeDate = ({ value }) => (
  <h3 className='pb_title_kit_3'>{largeDateString(value)}</h3>
)


export default function Date(props: DateProps) {
  const {
    size,
    value,
  } = props

  const dateTimeValue = new DateTime({ value: value });

  if (size == 'xs') return <ExtraSmallDate value={dateTimeValue} />
  if (size == 'lg') return <LargeDate value={dateTimeValue} />

  return <SmallDate value={dateTimeValue} />
}
