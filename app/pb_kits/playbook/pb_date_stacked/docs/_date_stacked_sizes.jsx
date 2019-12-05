import React from 'react'
import DateStacked from '../_date_stacked.jsx'

function DateStackedSizes() {
  return (
    <div>
      <DateStacked
          date={new Date()}
          size='sm'
      />
      <br />
      <DateStacked
          date={new Date()}
          size='md'
      />
    </div>
  )
}

export default DateStackedSizes
