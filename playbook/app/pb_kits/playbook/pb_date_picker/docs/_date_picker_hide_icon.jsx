import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerHideIcon = (props) => (
  <div>
    <DatePicker
        hideIcon
        pickerId="date-picker-hide-icon"
        {...props}
    />
  </div>
)

export default DatePickerHideIcon
