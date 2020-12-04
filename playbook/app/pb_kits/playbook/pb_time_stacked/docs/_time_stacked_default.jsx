import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedDefault = (props) => {
  return (
    <div>
      <TimeStacked
          {...props}
          date={new Date()}
      />
      <TimeStacked
          {...props}
          align="center"
          date={new Date()}
      />
      <TimeStacked
          {...props}
          align="right"
          date={new Date()}
      />
    </div>
  )
}

export default TimeStackedDefault
