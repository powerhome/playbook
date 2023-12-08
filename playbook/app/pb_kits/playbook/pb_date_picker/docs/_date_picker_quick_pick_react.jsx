import React from "react"
import DatePicker from "../_date_picker"

const DatePickerQuickPickReact = (props) => (
  <>
    <DatePicker
      allowInput
      mode='range'
      pickerId='date-picker-quick-pick'
      placeholder='mm/dd/yyyy to mm/dd/yyyy'
      customQuickPickDates={{
        override: false,
        dates: [
          {
            label: "Last 15 months",
            dates: {
              timePeriod: "months",
              amount: 15,
            },
          },
          {
            label: "First Week of 2020",
            dates: ["2020/01/01", "2020/01/07"],
          },
        ],
      }}
      selectionType='quickpick'
      {...props}
    />
  </>
)

export default DatePickerQuickPickReact
