import React from "react"
import DatePicker from "../_date_picker"

const DatePickerRequiredIndicator = (props) => (
  <DatePicker
      label="Required Date Picker"
      pickerId="date-picker-required-indicator"
      requiredIndicator
      {...props}
  />
)

export default DatePickerRequiredIndicator
