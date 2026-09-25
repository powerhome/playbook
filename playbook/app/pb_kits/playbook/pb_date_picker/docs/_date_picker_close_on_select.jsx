import React from 'react'

import DatePicker from '../_date_picker'

const DEFAULT_DATE = new Date()

const DatePickerCloseOnSelect = (props) => {
  return (
    <>
      <DatePicker
          closeOnSelect={false}
          defaultDate={DEFAULT_DATE}
          initializeOnce
          pickerId="date-picker-close-on-select"
          {...props}
      />
    </>
  )
}

export default DatePickerCloseOnSelect
