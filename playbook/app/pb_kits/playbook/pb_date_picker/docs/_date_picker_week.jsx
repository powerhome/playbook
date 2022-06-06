import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerWeek = (props) => {
  return (
    <div>
      <DatePicker
          label="Date Picker"
          pickerId="week-date-picker" 
          selectionType="week"
          {...props}
      />
    </div>
  )
}

export default DatePickerWeek