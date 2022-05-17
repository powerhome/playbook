import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerMonthAndYear = (props) => {
  return (
    <div>
      <DatePicker
          label="Date Picker"
          pickerId="disabled-date"
          selectionType="month"
          {...props}
      />
    </div>
  )
}

export default DatePickerMonthAndYear
