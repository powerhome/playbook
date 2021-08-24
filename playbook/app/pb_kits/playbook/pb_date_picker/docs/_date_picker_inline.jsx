import React from "react"

import DatePicker from "../_date_picker"

const DatePickerInline = (props) => {
  const selectDateHandler = (dateSelected) => {
    if (dateSelected) {
      document.querySelector(".inline-date-picker").classList.add("show-angle-down-icon")
    }
  }

  return (
    <div>
      <DatePicker
          className="inline-date-picker"
          hideIcon
          inLine
          onChange={selectDateHandler}
          pickerId="date-picker-inline"
          {...props}
      />
    </div>
  )
}

export default DatePickerInline
