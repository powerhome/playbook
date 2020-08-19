import React from 'react'
import { Date } from '../../'

const DateDefault = () => {
  return (
    <div>
      <Date
          date="2012-12-25"
      />

      <br />

      <Date
          date="2012-12-25"
          size="lg"
      />
    </div>
  )
}

export default DateDefault
