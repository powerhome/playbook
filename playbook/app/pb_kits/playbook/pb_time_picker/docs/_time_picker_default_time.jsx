import React from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'
import Body from '../../pb_body/_body'

const TimePickerDefaultTime = (props) => (
  <div>
    <TimePicker
        defaultTime="2:30 PM"
        id="time-picker-default-time-12hr"
        label="12-Hour Format (2:30 PM)"
        {...props}
    />
    <Body
        marginTop="md"
    />
    <TimePicker
        defaultTime="14:30"
        id="time-picker-default-time-24hr"
        label="24-Hour Format (14:30)"
        {...props}
    />
    <Body
        marginTop="md"
    />
    <TimePicker
        defaultTime="14:30"
        id="time-picker-default-time-24hr-format"
        label="24-Hour Format with timeFormat (14:30)"
        timeFormat="24hour"
        {...props}
    />
  </div>
)

export default TimePickerDefaultTime

