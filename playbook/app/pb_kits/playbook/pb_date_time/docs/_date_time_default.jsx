import React from 'react'
import DateTime from '../_date_time'

const DateTimeDefault = (props) => (
  <div>
    <DateTime
        datetime={new Date('2020-12-31 14:24:09')}
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
        datetime={new Date('2020/12/31 14:24:09 -0500')}
        timeZone="Asia/Tokyo"
        {...props}
    />
  </div>
)

export default DateTimeDefault
