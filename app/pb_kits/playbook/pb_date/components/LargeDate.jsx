/* @flow */

import React from 'react'

import DateTime from '../../pb_kit/dateTime.js'
import { largeDateString } from './helpers'

type LargeDateProps = {
  value: DateTime,
}

const LargeDate = ({ value }: LargeDateProps) => (
  <h3 className='pb_title_kit_3'>{largeDateString(value)}</h3>
)
export default LargeDate
