import React from "react"
import DatePicker from "../_date_picker"

const DatePickerQuickPickDateDisplay = (props) => (
  <>
    <DatePicker
        allowInput
        dateDisplay
        mode="range"
        pickerId="date-picker-quick-pick-date-display"
        placeholder="mm/dd/yyyy to mm/dd/yyyy"
        selectionType="quickpick"
        {...props}
    />
  </>
)

export default DatePickerQuickPickDateDisplay
