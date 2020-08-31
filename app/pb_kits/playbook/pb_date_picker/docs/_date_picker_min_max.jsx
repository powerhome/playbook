import React from 'react'
import { DatePicker } from '../../'

const DatePickerMinMax = () => (
  <div>
    <DatePicker
        label="Dynamic dates using flatpickr increment function"
        maxDate={new Date().fp_incr(3)}
        minDate={new Date().fp_incr(-3)}
        pickerId="date-picker-min-max1"
    />
    <DatePicker
        format="m/d/Y"
        label="Absolute formatted dates"
        maxDate="10/20/2020"
        minDate="10/10/2020"
        pickerId="date-picker-min-max2"
    />
  </div>
)

export default DatePickerMinMax
