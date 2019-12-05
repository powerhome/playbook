/* @flow */

import React from 'react'

import DateTime from '../pb_kit/dateTime.js'
import ExtraSmallDate from './components/ExtraSmallDate'
import SmallDate from './components/SmallDate'
import LargeDate from './components/LargeDate'

type DateProps = {
  size?: 'xs' | 'sm' | 'lg',
  value?: String,
}

export default function Date({ size, value }: DateProps) {
  const dateTimeValue = new DateTime({ value })

  if (size == 'xs') return <ExtraSmallDate value={dateTimeValue} />
  if (size == 'lg') return <LargeDate value={dateTimeValue} />

  return <SmallDate value={dateTimeValue} />
}
