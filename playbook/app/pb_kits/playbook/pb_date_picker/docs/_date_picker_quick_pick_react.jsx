import React from "react"
import DatePicker from "../_date_picker"

const DatePickerQuickPickReact = props => (
  <>
    <DatePicker
      allowInput
      mode="range"
      pickerId="date-picker-quick-pick"
      placeholder="mm/dd/yyyy to mm/dd/yyyy"
      selectionType="quickpick"
      {...props}
    />
  </>
)

export default DatePickerQuickPickReact
