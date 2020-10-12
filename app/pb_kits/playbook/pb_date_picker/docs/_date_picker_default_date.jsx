import React from 'react'
import { DatePicker } from '../../'

const DatePickerDefaultDate = () => (
  <div>
    <DatePicker
        defaultDate="07/31/2020"
        label="Default Date String"
        pickerId="date-picker-default-date1"
    />
    <DatePicker
        defaultDate={new Date().fp_incr(1)}
        label="Default Date Dynamic"
        pickerId="date-picker-default-date2"
    />
    <DatePicker
        defaultDate={[new Date(), new Date().fp_incr(6)]}
        label="Default Date Range"
        mode="range"
        pickerId="date-picker-default-date3"
    />
    <DatePicker
        defaultDate="blank"
        label="Blank"
        pickerId="date-picker-default-date4"
    />
  </div>
)

export default DatePickerDefaultDate
