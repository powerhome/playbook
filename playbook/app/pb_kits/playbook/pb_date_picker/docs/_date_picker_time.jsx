import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerTime = (props) => (
  <div>
    <DatePicker
        enableTime
        pickerId="date-picker-time"
        showTimezone={false}
        {...props}
    />
  </div>
)

export default DatePickerTime
