import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdated = (props) => {
  return (
    <div>
      <Timestamp
          showUser
          text="Maricris Nonato"
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate()), (new Date().getHours()), (new Date().getMinutes()))}
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
    </div>
  )
}

export default TimestampUpdated
