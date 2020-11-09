import React from 'react'
import DateTime from '../_date_time.jsx'

const DateTimeAlign = (props) => (
  <div>
    <DateTime
        datetime={new Date()}
        dayOfWeek
        icon
        {...props}
    />

    <br />

    <DateTime
        align="center"
        datetime={new Date()}
        dayOfWeek
        icon
        {...props}
    />

    <br />

    <DateTime
        align="right"
        datetime={new Date()}
        dayOfWeek
        icon
        {...props}
    />
  </div>
)

export default DateTimeAlign
