/* @flow */

import React from 'react'

import DateTime from '../../pb_kit/dateTime.js'
import { defaultDateString } from './helpers'

type ExtraSmallDateProps = {
  value: DateTime,
}

const ExtraSmallDate = ({ value }: ExtraSmallDateProps) => (
  <h3 className='pb_title_kit_4'>{defaultDateString(value)}</h3>
)

export default ExtraSmallDate
