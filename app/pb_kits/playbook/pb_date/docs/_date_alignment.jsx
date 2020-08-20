import React from 'react'
import { Date } from '../..'

const DateAlignment = () => {
  return (
    <div>
      <Date
          date="1995-12-25"
          dayOfWeek
          icon
      />

      <br />

      <Date
          alignment="center"
          date="2020-12-25"
          dayOfWeek
          icon
      />

      <br />

      <Date
          alignment="right"
          date="17 Mar 69"
      />
    </div>
  )
}

export default DateAlignment
