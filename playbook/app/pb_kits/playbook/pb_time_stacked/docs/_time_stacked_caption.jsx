import React from 'react'
import TimeStacked from '../_time_stacked.jsx'

const TimeStackedCaption = () => {
  return (
    <div>
      <TimeStacked
          date={new Date()}
          tag="caption"
      />
    </div>
  )
}

export default TimeStackedCaption
