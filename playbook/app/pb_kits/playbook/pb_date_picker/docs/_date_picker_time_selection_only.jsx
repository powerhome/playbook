import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerTimeSelectionOnly = (props) => {

  return (
    <div>
        <DatePicker
            label="Time Picker"
            name="date-picker-time-selection-only"
            pickerId="date-picker-time-selection-only"
            selectionType="timeSelection"
            {...props}
        />
        <DatePicker
            label="Time Picker with Timezone"
            name="date-picker-time-selection-only-timezone"
            pickerId="date-picker-time-selection-only-timezone"
            selectionType="timeSelection"
            showTimezone
            {...props}
        />
    </div>
  )
}

export default DatePickerTimeSelectionOnly
