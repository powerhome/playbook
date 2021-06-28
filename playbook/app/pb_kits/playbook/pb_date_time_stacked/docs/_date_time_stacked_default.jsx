import React from 'react'

import DateTimeStacked from '../_date_time_stacked'

const DateTimeStackedDefault = (props) => (
  <div>
    <DateTimeStacked
        datetime={new Date()}
        {...props}
    />
    <br />
    <DateTimeStacked
        datetime={new Date()}
        timeZone="Asia/Tokyo"

        {...props}
    />
    <br />
    <DateTimeStacked
        datetime={new Date()}
        timeZone="America/Denver"

        {...props}
    />

  </div>
)

export default DateTimeStackedDefault
