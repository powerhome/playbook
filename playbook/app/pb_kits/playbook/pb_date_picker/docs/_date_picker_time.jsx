/* eslint-disable react/no-multi-comp */
import React, { useMemo, useState } from 'react'

import DatePicker from '../_date_picker'
import Body from '../../pb_body/_body'

const DEFAULT_DATE = new Date()
DEFAULT_DATE.setHours(12)
DEFAULT_DATE.setMinutes(0)

const DatePickerTime = (props) => {
  const [selectedDateTime, setSelectedDateTime] = useState(DEFAULT_DATE)

  const refExample = React.createRef()

  const handleOnInputChanged = (dateTime) => {
    setSelectedDateTime(dateTime)
  }

  return (
    <div ref={refExample}>
      <Body marginBottom="md">{selectedDateTime.toString()}</Body>
      {useMemo(() => (
        <DatePicker
            closeOnSelect={false}
            defaultDate={DEFAULT_DATE}
            enableTime
            onChange={handleOnInputChanged}
            pickerId="date-picker-time"
            showTimezone
            {...props}
        />
      ), [props])}
    </div>
  )
}

export default DatePickerTime
