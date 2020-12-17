import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampElapsed = (props) => {
  return (
    <div>
      <Timestamp
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="elapsed"
          {...props}
      />

      <br />

      <Timestamp
          showUser={false}
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
          {...props}
      />
    </div>
  )
}

export default TimestampElapsed
