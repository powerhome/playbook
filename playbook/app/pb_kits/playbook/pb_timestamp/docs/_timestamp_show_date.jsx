import React from 'react'
import Timestamp from '../_timestamp'

const TimestampShowDate = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate={false}
          timestamp={new Date()}
          {...props}
      />
    </div>
  )
}

export default TimestampShowDate
