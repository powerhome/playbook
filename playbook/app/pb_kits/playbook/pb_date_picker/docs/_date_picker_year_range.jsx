import React from 'react'
import { DatePicker } from '../../'

const DatePickerYearRange = () => (
  <div>
    <DatePicker
        defaultDate="05/05/2015"
        maxDate="12/31/2018"
        minDate="01/01/2015"
        pickerId="date-picker-year-range"
        yearRange={[2015, 2018]}
    />
  </div>
)

export default DatePickerYearRange
