import React from "react"
import DatePicker from "../_date_picker"

const DatePickerAllowInput = props => (
  <>
    <DatePicker allowInput pickerId="date-picker-allow-input" {...props} />
  </>
)

export default DatePickerAllowInput
