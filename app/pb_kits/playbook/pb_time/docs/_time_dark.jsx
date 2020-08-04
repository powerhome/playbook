import React from 'react'
import Time from '../_time.jsx'

const TimeDark = () => {
  return (
    <div>
      <Time
          dark
          date={new Date()}
      />
      <br />
      <Time
          dark
          date={new Date()}
          showTimezone
      />
      <br />
      <Time
          dark
          date={new Date()}
          showIcon
          showTimezone
      />
    </div>
  )
}

export default TimeDark
