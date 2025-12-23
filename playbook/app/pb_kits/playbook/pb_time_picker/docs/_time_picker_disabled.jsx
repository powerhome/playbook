import React from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'

const TimePickerDisabled = (props) => (
  <div>
    <TimePicker
        disabled
        id="time-picker-disabled"
        label="Disabled Time Picker"
        {...props}
    />
    <TimePicker
        defaultTime="14:30"
        disabled
        id="time-picker-disabled-with-value"
        label="Disabled with Default Time"
        {...props}
    />
  </div>
)

export default TimePickerDisabled

