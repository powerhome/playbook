import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerInline = (props) => {
  const showAngleDownHandler = (dateSelected) => {
    if (dateSelected) {
      document.querySelector('.inline-date-picker').classList.add('show-angle-down-icon')
    } else {
      document.querySelector('.inline-date-picker').classList.remove('show-angle-down-icon')
    }
  }

  return (
    <div>
      <DatePicker
          className="inline-date-picker"
          hideIcon
          inLine
          onChange={showAngleDownHandler}
          pickerId="date-picker-inline"
          {...props}
      />
    </div>
  )
}

export default DatePickerInline
