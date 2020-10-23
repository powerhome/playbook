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
    </div>
  )
}

export default TimestampUpdated
