import React from 'react'
import TimePicker from '../_time_picker'

const TimePickerRequiredIndicator = (props) => (
  <div>
    <TimePicker
        id="time-picker-required-indicator"
        label="Select Time"
        requiredIndicator
        {...props}
    />
  </div>
)

export default TimePickerRequiredIndicator

