import React from 'react'
import { Date } from '../..'

const DateVariants = () => {
  return (
    <div>
      <Date
          date="1995-12-25"
      />

      <br />
      <br />

      <Date
          date="1995-12-25"
          showIcon
      />

      <br />
      <br />

      <Date
          date="1995-12-25"
          showDayOfWeek
      />

      <br />
      <br />

      <Date
          date="1995-12-25"
          showDayOfWeek
          showIcon
      />
    </div>
  )
}

export default DateVariants
