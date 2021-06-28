import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerLabel = (props) => (
  <div>
    <DatePicker
        label="Your Label Here"
        pickerId="date-picker-label"
        {...props}
    />
    <DatePicker
        hideLabel
        pickerId="date-picker-hide-label"
        {...props}
    />
  </div>
)

export default DatePickerLabel
