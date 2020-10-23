import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampElapsed = () => {
  return (
    <div>
      <Timestamp
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="elapsed"
      />

      <br />

      <Timestamp
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
      />
    </div>
  )
}

export default TimestampElapsed
