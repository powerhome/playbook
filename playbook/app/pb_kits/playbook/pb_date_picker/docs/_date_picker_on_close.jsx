/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react'
import DatePicker from '../_date_picker'
import Body from '../../pb_body/_body'

const DEFAULT_DATE = new Date()
DEFAULT_DATE.setHours(12)
DEFAULT_DATE.setMinutes(0)

const DatePickerOnClose = (props) => {
  const [selectedDateTime, setSelectedDateTime] = useState(DEFAULT_DATE)

  const handleOnInputChanged = (dateTime) => {
    
    setSelectedDateTime(dateTime)
  }

  return (
    <div>
      <Body marginBottom="md">{selectedDateTime.toString()}</Body>
        <DatePicker
            defaultDate={DEFAULT_DATE}
            enableTime
            onChange={handleOnInputChanged}
            onClose={console.log("Hello")}
            pickerId="date-picker-time"
            showTimezone
            {...props}
        />
    </div>
  )
}

export default DatePickerOnClose