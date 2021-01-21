import React from 'react'
import Timestamp from '../_timestamp.jsx'

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
          showUser={false}
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdated
