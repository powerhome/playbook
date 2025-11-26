import React from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'

const TimePickerTimezone = (props) => (
  <div>
    <TimePicker
        id="time-picker-timezone"
        showTimezone
        {...props}
    />
    <TimePicker
        id="time-picker-timezone-24hour"
        showTimezone
        timeFormat="24hour"
        {...props}
    />
  </div>
)

export default TimePickerTimezone

