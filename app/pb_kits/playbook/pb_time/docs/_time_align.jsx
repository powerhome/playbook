import React from 'react'
import Time from '../_time.jsx'

const TimeAlign = () => {
  return (
    <div>
      <Time
          date={new Date()}
          size="lg"
      />
      <br />
      <Time
          align="center"
          date={new Date()}
          size="lg"
      />
      <br />
      <Time
          align="right"
          date={new Date()}
          size="lg"
      />
    </div>
  )
}

export default TimeAlign
