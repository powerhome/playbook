import React from 'react'
import Time from '../_time.jsx'

const TimeDefault = () => {
  return (
    <div>
      <Time
          date={new Date()}
          size="lg"
          timeZone="America/New_York"
      />
      <br />
      <Time
          date={new Date().getTime()}
          size="sm"
      />
      <br />
      <Time
          date="2012-08-02T09:49:29Z"
          size="xs"
      />
    </div>
  )
}

export default TimeDefault
