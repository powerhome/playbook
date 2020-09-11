import React from 'react'
import { DatePicker } from '../../'

const DatePickerError = () => (
  <div>
    <DatePicker
        error="Invalid date. Please pick a valid date."
        pickerId="date-picker-error"
    />
  </div>
)

export default DatePickerError
