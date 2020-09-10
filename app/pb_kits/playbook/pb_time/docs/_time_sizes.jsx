import React from 'react'
import Time from '../_time.jsx'

const TimeSizes = () => {
  return (
    <div>
      <Time
          date={new Date()}
      />
      <br />
      <Time
          date={new Date()}
          size="md"
      />
    </div>
  )
}

export default TimeSizes
