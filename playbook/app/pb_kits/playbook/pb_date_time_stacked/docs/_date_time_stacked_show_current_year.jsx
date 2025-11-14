import React from 'react'

import DateTimeStacked from '../_date_time_stacked'

const DateTimeStackedShowCurrentYear = (props) => (
  <div>
    <DateTimeStacked
        datetime={new Date()}
        showCurrentYear
        {...props}
    />
    <br />
    <DateTimeStacked
        datetime={new Date()}
        showCurrentYear
        timeZone="America/Denver"
        {...props}
    />
  </div>
);

export default DateTimeStackedShowCurrentYear;
