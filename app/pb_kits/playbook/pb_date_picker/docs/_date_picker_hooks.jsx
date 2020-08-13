import React from 'react'
import { DatePicker } from '../../'

const DatePickerHooks = () => (
  <div>
    <DatePicker
        label="onChange"
        onChange={() => alert('changed')}
        pickerId="date-picker-hooks"
    />
  </div>
)

export default DatePickerHooks
