import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerDisabled = (props) => (
  <div>
    <DatePicker
        disableDate={[new Date().fp_incr(1)]}
        label="Disable Single Date"
        pickerId="single-disabled-date"
        {...props}
    />
    <DatePicker
        disableDate={[new Date().fp_incr(1), new Date().fp_incr(3)]}
        label="Disable Multiple Dates"
        pickerId="multiple-disabled-dates"
        {...props}
    />
    <DatePicker
        disableRange={[
          {
            from: new Date().fp_incr(1),
            to: new Date().fp_incr(7),
          },
        ]}
        label="Disable Single Range"
        pickerId="single-date-range"
        {...props}
    />
    <DatePicker
        disableRange={[
          {
            from: new Date().fp_incr(1),
            to: new Date().fp_incr(3),
          },
          {
            from: new Date().fp_incr(7),
            to: new Date().fp_incr(14),
          },
        ]}
        label="Disable Multiple Ranges"
        pickerId="multiple-date-ranges"
        {...props}
    />
    <DatePicker
        disableWeekdays={['Sunday', 'Saturday']}
        label="Disable Specific Weekdays"
        pickerId="disabled-weekdays"
        {...props}
    />
  </div>
)

export default DatePickerDisabled
