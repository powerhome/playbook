import React from 'react'
import { DatePicker } from '../../'

const DatePickerDisabled = () => (
  <div>
    <DatePicker
        pickerId="date-picker-disabled1"
    />
    <DatePicker
        disableRange={[
          {
            from: '07/25/2020',
            to: '07/28/2020',
          },
        ]}
        pickerId="date-picker-disabled2"
    />
    <DatePicker
        disableWeekdays={['Monday', 'Wednesday']}
        pickerId="date-picker-disabled3"
    />
  </div>
)

export default DatePickerDisabled
