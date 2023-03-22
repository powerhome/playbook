import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerQuickPick = (props) => (
  <div>
    <DatePicker
        defaultDate={[new Date(), new Date().fp_incr(7)]}
        mode="range"
        pickerId="date-picker-quick-pick"
        {...props}
    />
  </div>
)

export default DatePickerQuickPick
