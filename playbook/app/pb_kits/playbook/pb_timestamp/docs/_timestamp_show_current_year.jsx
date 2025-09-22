import React from 'react'
import Timestamp from '../_timestamp'


const TimestampShowCurrentYear = (props) => {
  return (
    <div>
      <Timestamp
          showCurrentYear
          timestamp={new Date()}
          {...props}
      />
      <br />
      <Timestamp
          showCurrentYear
          showTime={false}
          timestamp={new Date()}
          {...props}
      />

    </div>
  )
}

export default TimestampShowCurrentYear