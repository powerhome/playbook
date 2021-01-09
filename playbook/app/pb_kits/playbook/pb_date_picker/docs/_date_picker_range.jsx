import React from 'react'
import { DatePicker } from '../../'

const DatePickerRange = (props) => (
  <div>
    <DatePicker
        defaultDate={[new Date(), new Date().fp_incr(7)]}
        mode="range"
        pickerId="date-picker-range"
        {...props}
    />
  </div>
)

export default DatePickerRange
