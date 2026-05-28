import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerInline = (props) => {
  return (
    <div>
      <DatePicker
          inLine
          pickerId="date-picker-inline"
          {...props}
      />
    </div>
  )
}

export default DatePickerInline
