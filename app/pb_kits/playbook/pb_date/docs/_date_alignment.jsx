import React from 'react'
import { Date as FormattedDate } from '../..'

const DateAlignment = () => {
  return (
    <div>
      <FormattedDate
          date="1995-12-25"
          dayOfWeek
          icon
      />

      <br />

      <FormattedDate
          alignment="center"
          date="2020-12-25"
          dayOfWeek
          icon
      />

      <br />

      <FormattedDate
          alignment="right"
          date={new Date()}
      />
    </div>
  )
}

export default DateAlignment
