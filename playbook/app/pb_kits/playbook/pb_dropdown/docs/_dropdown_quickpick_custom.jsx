import React from "react"
import Dropdown from "../_dropdown"

const DropdownQuickpickCustom = (props) => (
  <div>
    <Dropdown
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
        label="Date Range"
        marginBottom="sm"
        onSelect={(selectedItem) => console.log(selectedItem)}
        variant="quickpick"
        {...props}
    />
    <Dropdown
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
          override: false,
        }}
        label="Date Range - Append to Defaults"
        onSelect={(selectedItem) => console.log(selectedItem)}
        variant="quickpick"
        {...props}
    />
  </div>
)

export default DropdownQuickpickCustom

