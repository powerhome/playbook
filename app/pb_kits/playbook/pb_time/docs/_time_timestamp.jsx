import React from 'react'
import Time from '../_time.jsx'

const TimeStamp = () => {
  return (
    <div>
      <Time
          date={new Date()}
          showIcon
          showTimezone
      />

      <br />

      <Time
          date={new Date().getTime()}
          showIcon
          showTimezone
          size="sm"
      />

      <br />

      <Time
          date="2012-08-02T15:49:29Z"
          showIcon
          showTimezone
          size="xs"
      />
    </div>
  )
}

export default TimeStamp
