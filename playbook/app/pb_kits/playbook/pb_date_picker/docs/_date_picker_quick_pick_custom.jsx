import React from "react"
import DatePicker from "../_date_picker"

const DatePickerQuickPickCustom = (props) => (
  <>
   <DatePicker
       allowInput
       customQuickPickDates={{
        dates: [
          // Allow Playbook to handle the logic...
          {
            label: "Last 15 months",
            value: {
              timePeriod: "months",
              amount: 15,
            },
          },
          // Or, be explicit with an exact date range for more control...
          {
            label: "First Week of June 2022",
            value: ["06/01/2022", "06/07/2022"],
          },
        ],
      }}
       mode='range'
       pickerId='date-picker-quick-pick-custom-override'
       placeholder='mm/dd/yyyy to mm/dd/yyyy'
       selectionType='quickpick'
       {...props}
   />
  </>
)

export default DatePickerQuickPickCustom
