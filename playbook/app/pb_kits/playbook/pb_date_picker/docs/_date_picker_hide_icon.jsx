import React from 'react'
import { DatePicker } from '../../'

const DatePickerHideIcon = (props) => (
  <div>
    <DatePicker
        {...props}
        hideIcon
        pickerId="date-picker-hide-icon"
    />
  </div>
)

export default DatePickerHideIcon
