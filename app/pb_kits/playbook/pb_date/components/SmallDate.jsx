/* @flow */

import React from 'react'

import DateTime from '../../pb_kit/dateTime.js'
import { Icon } from '../../'
import { defaultDateString } from './helpers'

type SmallDateProps = {
  value: DateTime,
}

const SmallDate = ({ value }: SmallDateProps) => (
  <h3 className='pb_title_kit_4'>
    <Icon
        fixedWidth="true"
        icon="calendar"
    />
    {defaultDateString(value)}
  </h3>
)

export default SmallDate
