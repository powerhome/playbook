import React from 'react'
import DatePicker from '../_date_picker'

const DatePickerQuickPickReact = (props) => (
  <>
    <DatePicker
        allowInput
        mode="range"
        pickerId="date-picker-quick-pick"
        placeholder="mm/dd/yyyy to mm/dd/yyyy"
        customQuickPickDates={
          [
            { label: 'Last 15 Months', dates: [ 
              
            ] },
            { label: 'Last 17 Months', dates: ['2020-01-01', '2020-01-07'] },

          ]
        }
        selectionType="quickpick"
        {...props}
    />
  </>
)

export default DatePickerQuickPickReact
