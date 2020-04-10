import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedAlign = () => {
  return (
    <div>
      <TimeStacked
          date={new Date()}
      />

      <br />

      <TimeStacked
          align="center"
          date={new Date()}
      />

      <br />

      <TimeStacked
          align="right"
          date={new Date()}
      />
    </div>
  )
}

export default TimeStackedAlign
