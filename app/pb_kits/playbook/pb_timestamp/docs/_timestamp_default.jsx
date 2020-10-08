import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampDefault = () => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate="false"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="left"
          showDate="true"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="left"
          showDate="true"
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate() + 1)).getTime()}
      />
    </div>
  )
}

export default TimestampDefault
