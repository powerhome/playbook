import React from 'react'
import Time from '../_time.jsx'

const TimeDefault = (props) => {
  return (
    <div>
      <Time
          date={new Date().getTime()}
          showTimezone={false}
          {...props}
      />
      <br />
      <Time
          date={new Date()}
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <Time
          date={new Date().getTime()}
          showIcon
          showTimezone={false}
          {...props}
      />
      <br />
      <Time
          date={new Date()}
          showIcon
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <br />
      <Time
          date={new Date()}
          showTimezone={false}
          size="md"
          {...props}
      />
      <br />
      <Time
          date={new Date()}
          size="md"
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <Time
          date={new Date()}
          showIcon
          showTimezone={false}
          size="md"
          {...props}
      />
      <br />
      <Time
          date={new Date()}
          showIcon
          size="md"
          timeZone="America/New_York"
          {...props}
      />
    </div>
  )
}

export default TimeDefault
