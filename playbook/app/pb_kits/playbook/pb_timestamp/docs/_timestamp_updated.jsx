import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdated = (props) => {
  return (
    <div>
      <Timestamp
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showUser={false}
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />
      <br />

      <Timestamp
          showTimezone
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showTimezone
          showUser={false}
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdated
