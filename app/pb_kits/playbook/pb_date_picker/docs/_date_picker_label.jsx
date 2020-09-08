import React from 'react'
import { DatePicker } from '../../'

const DatePickerLabel = () => (
  <div>
    <DatePicker
        label="Your Label Here"
        pickerId="date-picker-label"
    />
    <DatePicker
        hideLabel
        pickerId="date-picker-hide-label"
    />
  </div>
)

export default DatePickerLabel
