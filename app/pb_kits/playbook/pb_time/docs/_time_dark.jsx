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
          size="lg"
      />
      <br />
      <Time
          dark
          date={new Date()}
      />
    </div>
  )
}

export default TimeDark
