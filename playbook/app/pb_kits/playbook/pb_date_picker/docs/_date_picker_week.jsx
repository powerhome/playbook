import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerWeek = () => {
  return (
    <div>
      <DatePicker
          label="Date Picker"
          pickerId="disabled-date"
          plugins="ws"
      />
    </div>
  )
}

export default DatePickerWeek