import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdated = () => {
  return (
    <div>
      <Timestamp
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />

      <Timestamp
          showUser="false"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />
      <br />

      <Timestamp
          showTimezone="true"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
      />

      <br />

      <Timestamp
          showTimezone="true"
          showUser="false"
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
      />
    </div>
  )
}

export default TimestampUpdated
