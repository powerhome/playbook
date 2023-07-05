import React from 'react'
import DatePicker from '../_date_picker'

const DatePickerQuickPickRangeLimit = (props) => (
  <>
    <DatePicker
        allowInput
        mode="range"
        pickerId="thisRangesEndToday"
        placeholder="mm/dd/yyyy to mm/dd/yyyy"
        selectionType="quickpick"
        thisRangesEndToday
        {...props}
    />
  </>
)

export default DatePickerQuickPickRangeLimit
