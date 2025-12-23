import React from 'react'
import TimePicker from '../_time_picker'

const TimePickerLabel = (props) => (
  <div>
    <TimePicker
        id="time-picker-label"
        label="Select Time"
        {...props}
    />
  </div>
)

export default TimePickerLabel

