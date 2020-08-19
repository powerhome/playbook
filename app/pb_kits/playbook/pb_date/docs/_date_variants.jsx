import React from 'react'
import { Date } from '../..'

const DateVariants = () => {
  return (
    <div className="pb--doc-demo-row">
      <div>
        <Date
            date="1995-12-25"
        />

        <br />
        <br />

        <Date
            date="1995-12-25"
            icon
        />

        <br />
        <br />

        <Date
            date="1995-12-25"
            dayOfWeek
        />

        <br />
        <br />

        <Date
            date="1995-12-25"
            dayOfWeek
            icon
        />
      </div>

      <div>
        <Date
            date="1995-12-25"
            size="lg"
        />

        <br />
        <br />

        <Date
            date="1995-12-25"
            dayOfWeek
            size="lg"
        />
      </div>
    </div>
  )
}

export default DateVariants
