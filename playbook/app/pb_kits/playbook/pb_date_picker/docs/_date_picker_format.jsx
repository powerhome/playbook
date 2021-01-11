import React from 'react'
import { DatePicker } from '../../'

const DatePickerFormat = (props) => (
  <div>
    <DatePicker
        defaultDate={new Date()}
        format="m-d-Y"
        pickerId="date-picker-format1"
        {...props}
    />
    <DatePicker
        defaultDate={new Date()}
        format="m/d/y"
        pickerId="date-picker-format2"
        {...props}
    />
    <DatePicker
        defaultDate={new Date()}
        format="n-j-y"
        pickerId="date-picker-format3"
        {...props}
    />
    <DatePicker
        defaultDate={new Date()}
        format="Y-d-m"
        pickerId="date-picker-format4"
        {...props}
    />
  </div>
)

export default DatePickerFormat
