import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerQuickPick = (props) => (
  <div>
    <DatePicker
        selectionType="quickpick"
        {...props}
    />
  </div>
)

export default DatePickerQuickPick
