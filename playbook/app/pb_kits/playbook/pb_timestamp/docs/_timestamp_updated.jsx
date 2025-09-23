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
    </div>
  )
}

export default TimestampUpdated
