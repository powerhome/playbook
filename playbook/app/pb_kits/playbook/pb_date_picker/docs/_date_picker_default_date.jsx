import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerDefaultDate = (props) => (
  <div>
    <DatePicker
        defaultDate="07/31/2020"
        label="Default Date String"
        pickerId="date-picker-default-date1"
        {...props}
    />
    <DatePicker
        defaultDate={new Date().fp_incr(1)}
        label="Default Date Dynamic"
        pickerId="date-picker-default-date2"
        {...props}
    />
    <DatePicker
        label="Default Behavior"
        pickerId="date-picker-default-date4"
        {...props}
    />
  </div>
)

export default DatePickerDefaultDate
