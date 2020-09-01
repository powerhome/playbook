import React from 'react'
import DateTime from '../_date_time.jsx'

const DateTimeAlign = () => (
  <div>
    <DateTime
        datetime={new Date()}
        dayOfWeek
        icon
    />

    <br />

    <DateTime
        align="center"
        datetime={new Date()}
        dayOfWeek
        icon
    />

    <br />

    <DateTime
        align="right"
        datetime={new Date()}
        dayOfWeek
        icon
    />
  </div>
)

export default DateTimeAlign
