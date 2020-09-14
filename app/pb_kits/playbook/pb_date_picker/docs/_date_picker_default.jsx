import React, { useState } from 'react'
import { Date as DateKit, DatePicker, LabelValue } from '../../'

const DatePickerDefault = () => {
  const [dateString, setDateString] = useState((new Date()).toLocaleDateString())
  const [dateObj, setDateObj] = useState([new Date()])

  const changeHandler = (dateStr, selectedDates) => {
    setDateString(dateStr)
    setDateObj(selectedDates)
  }

  return (
    <div>
      <LabelValue
          label="Date Object"
          value={dateObj[0] ? dateObj[0].toString() : ''}
      />
      <br />
      <br />
      <LabelValue
          label="Date String"
          value={dateString}
      />
      <br />
      <br />
      <DateKit
          value={dateObj[0]}
      />
      <br />
      <br />
      <DatePicker
          defaultDate={dateString}
          onChange={changeHandler}
          pickerId="date-picker-default"
      />
    </div>
  )
}
export default DatePickerDefault
