import React from "react"
import DatePicker from "../_date_picker"
import Caption from "../../pb_caption/_caption"

const DatePickerQuickPickCustom = (props) => (
  <>
   <DatePicker
      allowInput
      mode='range'
      pickerId='date-picker-quick-pick-custom-override'
      placeholder='mm/dd/yyyy to mm/dd/yyyy'
      customQuickPickDates={{
        dates: [
          {
            label: "Next 15 months",
            dates: {
              timePeriod: "months",
              amount: 15,
            },
          },
          {
            label: "First Week of June 2022",
            dates: ["06/01/2022", "06/07/2022"],
          },
        ],
      }}
      selectionType='quickpick'
      {...props}
    />

    <Caption marginTop="xl">Append to Defaults</Caption>

    To append custom dates to the default quick pick dates, set the override prop to false.

    <DatePicker
      marginTop="lg"
      allowInput
      mode='range'
      pickerId='date-picker-quick-pick-custom'
      placeholder='mm/dd/yyyy to mm/dd/yyyy'
      customQuickPickDates={{
        override: false,
        dates: [
          {
            label: "Next 15 months",
            dates: {
              timePeriod: "months",
              amount: 15,
            },
          },
          {
            label: "First Week of June 2022",
            dates: ["06/01/2022", "06/07/2022"],
          },
        ],
      }}
      selectionType='quickpick'
      {...props}
    />
  </>
)

export default DatePickerQuickPickCustom
