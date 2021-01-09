import React from 'react'
import { DatePicker } from '../../'

const DatePickerError = (props) => (
  <div>
    <DatePicker
        error="Invalid date. Please pick a valid date."
        pickerId="date-picker-error"
        {...props}
    />
  </div>
)

export default DatePickerError
