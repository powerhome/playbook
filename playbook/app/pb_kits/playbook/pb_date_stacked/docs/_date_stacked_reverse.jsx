import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedDefault = (props) => {
  return (
    <div>

      <DateStacked
          align="left"
          date={new Date()}
          reverse
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          date={new Date()}
          reverse
          size="md"
          {...props}
      />

    </div>
  )
}

export default DateStackedDefault
