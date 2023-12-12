import React from "react"
import DatePicker from "../_date_picker"
import Caption from "../../pb_caption/_caption"

const DatePickerQuickPickCustomOverride = (props) => (
  <>
    <DatePicker
      marginTop='lg'
      allowInput
      mode='range'
      pickerId='date-picker-quick-pick-custom'
      placeholder='mm/dd/yyyy to mm/dd/yyyy'
      customQuickPickDates={{
        override: false,
        dates: [
          {
            label: "Last 15 months",
            value: {
              timePeriod: "months",
              amount: 15,
            },
          },
          {
            label: "First Week of June 2022",
            value: ["06/01/2022", "06/07/2022"],
          },
        ],
      }}
      selectionType='quickpick'
      {...props}
    />
  </>
)

export default DatePickerQuickPickCustomOverride
