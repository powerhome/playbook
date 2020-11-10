import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedDefault = () => {
  return (
    <div>
      <TimeStacked
          date={new Date()}
      />
      <TimeStacked
          align="center"
          date={new Date()}
      />
      <TimeStacked
          align="right"
          date={new Date()}
      />
    </div>
  )
}

export default TimeStackedDefault
