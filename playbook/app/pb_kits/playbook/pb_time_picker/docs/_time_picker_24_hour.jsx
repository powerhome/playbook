import React from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'

const TimePicker24Hour = (props) => (
  <div>
    <TimePicker
        defaultTime="14:30"
        id="time-picker-24-hour"
        label="24-Hour Format"
        timeFormat="24hour"
        {...props}
    />
  </div>
)

export default TimePicker24Hour

