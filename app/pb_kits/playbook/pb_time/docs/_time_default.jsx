import React from 'react'
import Time from '../_time.jsx'

const TimeDefault = () => {
  return (
    <div>
      <Time
          date={new Date().getTime()}
      />
      <br />
      <Time
          date={new Date()}
          timeZone="America/New_York"
      />
      <br />
      <Time
          date={new Date().getTime()}
          showIcon
      />
      <br />
      <Time
          date={new Date()}
          showIcon
          timeZone="America/New_York"
      />
      <br />
      <br />
      <Time
          date={new Date()}
          size="lg"
      />
      <br />
      <Time
          date={new Date()}
          size="lg"
          timeZone="America/New_York"
      />
      <br />
      <Time
          date={new Date()}
          showIcon
          size="lg"
      />
      <br />
      <Time
          date={new Date()}
          showIcon
          size="lg"
          timeZone="America/New_York"
      />
    </div>
  )
}

export default TimeDefault
