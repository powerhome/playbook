import React from 'react'
import Timestamp from '../_timestamp'

const todaysDate = new Date()

const TimestampUpdatedShowTime = (props) => {
  return (
    <div>
      <Timestamp
          showTime={false}
          showUser
          text="Maricris Nonato"
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showTime={false}
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

       <br />

      <Timestamp
          showCurrentYear
          showTime={false}
          timestamp={todaysDate}
          variant="updated"
          {...props}
      />

    </div>
  )
}

export default TimestampUpdatedShowTime
