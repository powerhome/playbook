import React from 'react'
import { DatePicker } from '../../'

const DatePickerMinMax = () => (
  <div>
    <DatePicker
        maxDate="07/30/2020"
        minDate="07/27/2020"
        pickerId="date-picker-min-max"
    />
  </div>
)

export default DatePickerMinMax
