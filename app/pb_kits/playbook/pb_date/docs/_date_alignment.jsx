import React from 'react'
import { Date as FormattedDate } from '../..'

const DateAlignment = () => {
  return (
    <div>
      <FormattedDate
          dayOfWeek
          icon
          value="1995-12-25"
      />

      <br />

      <FormattedDate
          alignment="center"
          dayOfWeek
          icon
          value="2020-12-25"
      />

      <br />

      <FormattedDate
          alignment="right"
          value={new Date()}
      />
    </div>
  )
}

export default DateAlignment
