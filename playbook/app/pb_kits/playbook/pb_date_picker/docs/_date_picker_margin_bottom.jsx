
import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerMarginBottom = (props) => (
  <div>
    <DatePicker
        marginBottom="none"
        pickerId="date-picker-none"
        {...props}
    />
    <DatePicker
        marginBottom="xs"
        pickerId="date-picker-xs"
        {...props}
    />
    <DatePicker
        marginBottom="sm"
        pickerId="date-picker-sm"
        {...props}
    />
    <DatePicker
        marginBottom="md"
        pickerId="date-picker-md"
        {...props}
    />
    <DatePicker
        marginBottom="lg"
        pickerId="date-picker-lg"
        {...props}
    />
    <DatePicker
        marginBottom="xl"
        pickerId="date-picker-xl"
        {...props}
    />
  </div>
)

export default DatePickerMarginBottom
