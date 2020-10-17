import React from 'react'
import Time from '../_time.jsx'

const TimeStamp = (props) => {
  return (
    <div>
      <Time
          date={new Date()}
          size="sm"
          {...props}
      />

      <br />

      <Time
          date={new Date().getTime()}
          size="sm"
          {...props}
      />
    </div>
  )
}

export default TimeStamp
