import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampTimezones = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate={false}
          showTimezone
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate()), (new Date().getHours()), (new Date().getMinutes()))}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate={false}
          showTimezone
          timestamp={new Date().getTime()}
          timezone="Asia/Hong_Kong"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={new Date().getTime()}
          timezone="Asia/Hong_Kong"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate()), (new Date().getHours()), (new Date().getMinutes()))}
          timezone="Asia/Hong_Kong"
          {...props}
      />
    </div>
  )
}

export default TimestampTimezones
