import React from 'react'

import DatePicker from '../_date_picker'

const DEFAULT_DATE = new Date()
DEFAULT_DATE.setHours(12)
DEFAULT_DATE.setMinutes(0)

const DatePickerTime = (props) => (
  <div>
    <DatePicker
        defaultDate={DEFAULT_DATE}
        enableTime
        pickerId="date-picker-time"
        showTimezone
        {...props}
    />
  </div>
)

export default DatePickerTime
