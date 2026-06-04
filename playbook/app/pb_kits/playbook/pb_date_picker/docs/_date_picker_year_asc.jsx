import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerYearAsc = (props) => (
  <div>
    <DatePicker
        pickerId="date-picker-date-asc"
        yearAscending
        {...props}
    />
  </div>
)

export default DatePickerYearAsc
