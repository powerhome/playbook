import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerQuickPick = (props) => (
  <div>
    <DatePicker
        allowInput
        mode="range"
        pickerId="date-picker-quick-pick"
        placeholder="mm/dd/yyyy → mm/dd/yyyy"
        position="below right"
        selectionType="quickpick"
        staticPosition={false}
        {...props}
    />
  </div>
)

export default DatePickerQuickPick
