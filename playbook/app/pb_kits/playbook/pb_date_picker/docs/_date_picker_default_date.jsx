import React from 'react'
import { DatePicker } from '../../'

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
        defaultDate={[new Date(), new Date().fp_incr(7)]}
        label="Default Date Range"
        mode="range"
        pickerId="date-picker-default-date3"
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
