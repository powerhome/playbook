import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerMonthAndYear = (props) => {
  return (
    <div>
      <DatePicker
          label="Date Picker"
          pickerId="disabled-date"
          plugins
          {...props}
      />
    </div>
  )
}

export default DatePickerMonthAndYear
