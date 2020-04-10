import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedDarkAlign = () => {
  return (
    <div>
      <TimeStacked
          dark
          date={new Date()}
      />

      <br />

      <TimeStacked
          align="center"
          dark
          date={new Date()}
      />

      <br />

      <TimeStacked
          align="right"
          dark
          date={new Date()}
      />
    </div>
  )
}

export default TimeStackedDarkAlign
