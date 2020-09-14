import React from 'react'
import Time from '../_time.jsx'

const TimeAlign = () => {
  return (
    <div>
      <Time
          date={new Date()}
          size="md"
      />
      <br />
      <Time
          align="center"
          date={new Date()}
          size="md"
      />
      <br />
      <Time
          align="right"
          date={new Date()}
          size="md"
      />
    </div>
  )
}

export default TimeAlign
