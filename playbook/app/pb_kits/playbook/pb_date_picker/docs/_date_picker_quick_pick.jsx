import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerQuickPick = (props) => (
  <div>
    <DatePicker
        allowInput
        defaultDate={[new Date(), new Date().fp_incr(7)]}
        mode="range"
        pickerId="date-picker-quick-pick"
        position="below right"
        selectionType="quickpick"
        staticPosition={false}
        {...props}
    />
  </div>
)

export default DatePickerQuickPick
