import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerDefault = (props) => (
  <div>
    <DatePicker
        cursor="notAllowed"
        pickerId="date-picker-default"
        {...props}
    />
  </div>
)

export default DatePickerDefault
