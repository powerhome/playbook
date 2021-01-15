import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedDefault = (props) => {
  return (
    <div>
      <TimeStacked
          time={new Date()}
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <TimeStacked
          align="center"
          time={new Date()}
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <TimeStacked
          align="right"
          time={new Date()}
          timeZone="America/New_York"
          {...props}
      />
    </div>
  )
}

export default TimeStackedDefault
