import React from 'react'
import { DatePicker } from '../../'

const DatePickerFormat = () => (
  <div>
    <DatePicker
        format="m-d-Y"
        pickerId="date-picker-format1"
    />
    <DatePicker
        format="m/d/y"
        pickerId="date-picker-format2"
    />
    <DatePicker
        format="n-j-y"
        pickerId="date-picker-format3"
    />
    <DatePicker
        format="Y-d-m"
        pickerId="date-picker-format4"
    />
  </div>
)

export default DatePickerFormat
