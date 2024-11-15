import React from "react"
import DatePicker from "../_date_picker"

const DatePickerQuickPickDefaultDate = (props) => (
    <>
        <DatePicker
            allowInput
            defaultDate="This month"
            mode="range"
            pickerId="quick-pick-default-date"
            placeholder="mm/dd/yyyy to mm/dd/yyyy"
            selectionType="quickpick"
            {...props}
        />

        <DatePicker
            allowInput
            customQuickPickDates={{
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
            defaultDate="First Week of June 2022"
            label="Custom Date Picker"
            mode="range"
            pickerId="custom-quick-pick-default-date"
            placeholder="mm/dd/yyyy to mm/dd/yyyy"
            selectionType="quickpick"
            {...props}
        />
    </>
)

export default DatePickerQuickPickDefaultDate
