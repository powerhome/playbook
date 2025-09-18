import React from 'react'
import Timestamp from '../_timestamp'

const todaysDate = new Date()

const TimestampUpdatedShowDate = (props) => {
  return (
    <div>
      <Timestamp
          showDate={false}
          showUser
          text="Maricris Nonato"
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showDate={false}
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdatedShowDate
