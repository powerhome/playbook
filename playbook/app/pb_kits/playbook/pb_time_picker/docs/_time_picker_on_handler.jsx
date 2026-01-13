import React, { useState } from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'
import Body from '../../pb_body/_body'

const TimePickerOnHandler = (props) => {
  const [selectedTime, setSelectedTime] = useState('')
  const [closedTime, setClosedTime] = useState('')

  const handleTimeChange = (time) => {
    setSelectedTime(time)
  }

  const handleTimeClose = (time) => {
    setClosedTime(time)
  }

  return (
    <div>
      {(selectedTime || closedTime) && (
        <div style={{ marginBottom: '16px' }}>
          {selectedTime && (
            <Body
                text={`onChange: ${selectedTime}`}
            />
          )}
          {closedTime && (
            <Body
                marginTop={selectedTime ? "xs" : "none"}
                text={`onClose: ${closedTime}`}
            />
          )}
        </div>
      )}
      <TimePicker
          id="time-picker-on-handler"
          onChange={handleTimeChange}
          onClose={handleTimeClose}
          {...props}
      />
    </div>
  )
}

export default TimePickerOnHandler

