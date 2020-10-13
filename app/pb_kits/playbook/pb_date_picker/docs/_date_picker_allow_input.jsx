import React from 'react'
import { DatePicker } from '../..'

const DatePickerAllowInput = () => (
  <div>
    <DatePicker
        allowInput
        pickerId="date-picker-read-only"
    />
  </div>
)

export default DatePickerAllowInput
