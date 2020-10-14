import React, { useState } from 'react'
import { DatePicker, LabelValue } from '../..'

const DatePickerOnChange = () => {
  const today = new Date()
  const [dateString, setDateString] = useState(today.toLocaleDateString())
  const [dateObj, setDateObj] = useState([today])

  const changeHandler = (dateStr, selectedDates) => {
    setDateString(dateStr)
    setDateObj(selectedDates)
  }

  return (
    <div>
      <DatePicker
          defaultDate={dateString}
          marginBottom="lg"
          onChange={changeHandler}
          pickerId="date-picker-onchange"
      />
      <LabelValue
          label="Date Object"
          marginBottom="lg"
          value={dateObj[0] ? dateObj[0].toString() : ''}
      />
      <LabelValue
          label="Date String"
          value={dateString}
      />
    </div>
  )
}
export default DatePickerOnChange
