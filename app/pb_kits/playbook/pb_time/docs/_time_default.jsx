import React from 'react'
import Time from '../_time.jsx'

const TimeDefault = () => {
  return (
    <div>
      <Time
          date={new Date()}
          showTimezone
          size="lg"
      />
      <br />
      <Time
          date={new Date().getTime()}
          showTimezone
          size="sm"
      />
      <br />
      <Time
          date="2012-08-02T09:49:29Z"
          showTimezone
          size="xs"
      />
    </div>
  )
}

export default TimeDefault
