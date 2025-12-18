import React from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'

const TimePickerError = (props) => (
  <div>
    <TimePicker
        error="Please select a valid time"
        id="time-picker-error"
        {...props}
    />
  </div>
)

export default TimePickerError

