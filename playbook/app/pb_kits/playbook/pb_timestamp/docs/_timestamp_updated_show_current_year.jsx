import React from 'react'
import Timestamp from '../_timestamp'

const todaysDate = new Date()

const TimestampUpdatedShowCurrentYear = (props) => {
  return (
    <div>
      <Timestamp
          showCurrentYear
          showUser
          text="Maricris Nonato"
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showCurrentYear
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdatedShowCurrentYear
