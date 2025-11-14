import React from 'react'
import DateTime from '../_date_time'

const DateTimeShowCurrentYear = (props) => (
  <div>
    <DateTime
        datetime={new Date()}
        showCurrentYear
        {...props}
    />
  </div>
)

export default DateTimeShowCurrentYear
