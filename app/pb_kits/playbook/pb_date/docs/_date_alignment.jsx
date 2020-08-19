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

      <br />

      <Date
          date="17 Mar 20"
          dayOfWeek
          size="lg"
      />

      <br />

      <Date
          alignment="center"
          date="1995-04-20T04:20:00.000Z"
          dayOfWeek
          size="lg"
      />

      <br />

      <Date
          alignment="right"
          date="2020-04-20T04:20:00.000Z"
          dayOfWeek
          size="lg"
      />

    </div>
  )
}

export default DateAlignment
