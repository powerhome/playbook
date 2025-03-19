/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react'

import DatePicker from '../../pb_date_picker/_date_picker'
import LabelValue from '../../pb_label_value/_label_value'


const DatePickerOnClose = (props) => {
  const today = new Date()
  const [dateString, setDateString] = useState(today.toLocaleDateString())
  const [dateObj, setDateObj] = useState([today])

  const handleOnClose = (selectedDates, dateStr) => {
    setDateString(dateStr)
    setDateObj(selectedDates)
  }


  return (
    <div>
        <DatePicker
            defaultDate={dateString}
            enableTime
            marginBottom="lg"
            onClose={handleOnClose}
            pickerId="date-picker-on-close"
            showTimezone
            {...props}
        />
        <LabelValue
            label="Date Object"
            marginBottom="lg"
            value={dateObj[0] ? dateObj[0].toString() : ''}
            {...props}
        />
        <LabelValue
            label="Date String"
            value={dateString}
            {...props}
        />
    </div>
  )
}

export default DatePickerOnClose