import React, { useState } from 'react'
import TimePicker from '../../pb_time_picker/_time_picker'
import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'

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
        <Flex marginBottom="sm" 
            orientation="column"
        >
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
        </Flex>
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

