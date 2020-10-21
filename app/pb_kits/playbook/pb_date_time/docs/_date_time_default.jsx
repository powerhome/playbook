import React from 'react'
import DateTime from '../_date_time.jsx'

const DateTimeDefault = () => (
  <div>
    <DateTime
        datetime={new Date()}
        showDayOfWeek
        showIcon
    />

    <br />

    <DateTime
        datetime={new Date()}
        showDayOfWeek
    />

    <br />

    <DateTime
        datetime={new Date()}
        showIcon
    />

    <br />

    <DateTime
        datetime={new Date()}
    />
  </div>
)

export default DateTimeDefault
