import React from 'react'
import DateStacked from '../_date_stacked.jsx'

function DateStackedDefault() {
  return (
    <div>

      <DateStacked
          align='left'
          date={new Date()}
          reverse
          size='sm'
      />

      <br />

      <DateStacked
          date={new Date()}
          reverse
          size='md'
      />

    </div>
  )
}

export default DateStackedDefault
