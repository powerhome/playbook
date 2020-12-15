import React from 'react'
import { DatePicker } from '../../'

const DatePickerError = (props) => (
  <div>
    <DatePicker
        {...props}
        error="Invalid date. Please pick a valid date."
        pickerId="date-picker-error"
    />
  </div>
)

export default DatePickerError
