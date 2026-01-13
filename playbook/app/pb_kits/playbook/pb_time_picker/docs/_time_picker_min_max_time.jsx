import React from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'

const TimePickerMinMaxTime = (props) => (
  <div>
    <TimePicker
        id="time-picker-min-only"
        label="Minimum Time Only"
        minTime="09:00"
        {...props}
    />
    <TimePicker
        id="time-picker-max-only"
        label="Maximum Time Only"
        maxTime="17:00"
        timeFormat="24hour"
        {...props}
    />
    <TimePicker
        id="time-picker-min-max-12hr"
        label="Min & Max Time Range (12-hour)"
        maxTime="17:00"
        minTime="09:00"
        {...props}
    />
    <TimePicker
        id="time-picker-min-max-24hr"
        label="Min & Max Time Range (24-hour)"
        maxTime="17:00"
        minTime="09:00"
        timeFormat="24hour"
        {...props}
    />
    <TimePicker
        id="time-picker-pm-only"
        label="PM Only Range (AM disabled)"
        maxTime="17:00"
        minTime="13:00"
        {...props}
    />
    <TimePicker
        id="time-picker-am-only"
        label="AM Only Range (PM disabled)"
        maxTime="11:30"
        minTime="06:00"
        {...props}
    />
  </div>
)

export default TimePickerMinMaxTime

