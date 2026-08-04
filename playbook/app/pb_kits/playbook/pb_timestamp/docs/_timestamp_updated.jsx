import React from 'react'
import Timestamp from '../_timestamp'

const todaysDate = new Date()

const TimestampUpdated = (props) => {
  return (
    <div>
      <Timestamp
          showUser
          text="Maricris Nonato"
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showTimezone
          timestamp={todaysDate}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showDate={false}
          showTimezone
          timestamp={todaysDate}
          timezone="Asia/Hong_Kong"
          variant="updated"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdated
