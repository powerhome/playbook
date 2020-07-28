import React from 'react'
import { DatePicker } from '../../'

const DatePickerDisabled = () => (
  <div>
    <DatePicker
        disableDate={['07/28/2020']}
        label="Disable Single Date"
        pickerId="single-disabled-date"
    />
    <DatePicker
        disableDate={['07/28/2020', '07/31/2020']}
        label="Disable Multiple Dates"
        pickerId="multiple-disabled-dates"
    />
    <DatePicker
        disableRange={[
          {
            from: '07/25/2020',
            to: '07/28/2020',
          },
        ]}
        label="Disable Single Range"
        pickerId="single-date-range"
    />
    <DatePicker
        disableRange={[
          {
            from: '07/25/2020',
            to: '07/28/2020',
          },
          {
            from: '07/31/2020',
            to: '08/08/2020',
          },
        ]}
        label="Disable Multiple Dates"
        pickerId="multiple-date-ranges"
    />
    <DatePicker
        disableWeekdays={['Sunday', 'Saturday']}
        label="Disable Weekdays"
        pickerId="disabled-weekdays"
    />
  </div>
)

export default DatePickerDisabled
