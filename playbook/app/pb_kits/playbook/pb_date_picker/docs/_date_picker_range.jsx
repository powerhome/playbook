import React from 'react'
import { DatePicker } from '../../'

const DatePickerRange = () => (
  <div>
    <DatePicker
        defaultDate={[new Date(), new Date().fp_incr(6)]}
        mode="range"
        pickerId="date-picker-range"
    />
  </div>
)

export default DatePickerRange
