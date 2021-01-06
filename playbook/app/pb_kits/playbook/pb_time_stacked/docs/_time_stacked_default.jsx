import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedDefault = (props) => {
  return (
    <div>
      <TimeStacked
          date={new Date().getTime()}
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <TimeStacked
          align="center"
          date={new Date()}
          timeZone="America/New_York"
          {...props}
      />
      <br />
      <TimeStacked
          align="right"
          date={new Date()}
          timeZone="America/New_York"
          {...props}
      />
    </div>
  )
}

export default TimeStackedDefault
