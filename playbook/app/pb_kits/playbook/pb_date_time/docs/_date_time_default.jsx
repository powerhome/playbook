import React from 'react'
import DateTime from '../_date_time.jsx'

const DateTimeDefault = (props) => (
  <div>
    <DateTime
        datetime={new Date()}
        showDayOfWeek
        showIcon
        {...props}
    />

    <br />

    <DateTime
        datetime={new Date()}
        showDayOfWeek
        {...props}
    />

    <br />

    <DateTime
        datetime={new Date()}
        showIcon
        {...props}
    />

    <br />

    <DateTime
        datetime={new Date()}
        {...props}
    />
  </div>
)

export default DateTimeDefault
