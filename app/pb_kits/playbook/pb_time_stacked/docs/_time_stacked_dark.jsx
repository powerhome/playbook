import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedDark = () => {
  return (
    <div>
      <TimeStacked
          dark
          date={new Date()}
      />
    </div>
  )
}

export default TimeStackedDark
