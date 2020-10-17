import React from 'react'
import { DatePicker } from '../../'

const DatePickerFormat = () => (
  <div>
    <DatePicker
        defaultDate={new Date()}
        format="m-d-Y"
        pickerId="date-picker-format1"
    />
    <DatePicker
        defaultDate={new Date()}
        format="m/d/y"
        pickerId="date-picker-format2"
    />
    <DatePicker
        defaultDate={new Date()}
        format="n-j-y"
        pickerId="date-picker-format3"
    />
    <DatePicker
        defaultDate={new Date()}
        format="Y-d-m"
        pickerId="date-picker-format4"
    />
  </div>
)

export default DatePickerFormat
