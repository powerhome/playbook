import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerWeek = (props) => {
  return (
    <div>
      <DatePicker
          label="Date Picker"
          pickerId="week-date-picker"
          plugins="ws"
          {...props}
      />
    </div>
  )
}

export default DatePickerWeek