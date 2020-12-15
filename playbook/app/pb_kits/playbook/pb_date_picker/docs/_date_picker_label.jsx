import React from 'react'
import { DatePicker } from '../../'

const DatePickerLabel = (props) => (
  <div>
    <DatePicker
        {...props}
        label="Your Label Here"
        pickerId="date-picker-label"
    />
    <DatePicker
        {...props}
        hideLabel
        pickerId="date-picker-hide-label"
    />
  </div>
)

export default DatePickerLabel
