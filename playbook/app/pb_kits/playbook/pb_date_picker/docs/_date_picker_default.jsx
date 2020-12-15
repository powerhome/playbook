import React from 'react'
import { DatePicker } from '../../'

const DatePickerDefault = (props) => (
  <div>
    <DatePicker
        {...props}
        pickerId="date-picker-default"
    />
  </div>
)

export default DatePickerDefault
