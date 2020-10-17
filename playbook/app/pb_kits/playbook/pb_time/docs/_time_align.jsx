import React from 'react'
import Time from '../_time.jsx'

const TimeAlign = (props) => {
  return (
    <div>
      <Time
          date={new Date()}
          size="md"
          {...props}
      />
      <br />
      <Time
          align="center"
          date={new Date()}
          size="md"
          {...props}
      />
      <br />
      <Time
          align="right"
          date={new Date()}
          size="md"
          {...props}
      />
    </div>
  )
}

export default TimeAlign
