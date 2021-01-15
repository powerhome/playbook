import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedDefault = (props) => {
  return (
    <div>

      <DateStacked
          align="left"
          date={new Date()}
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          date={new Date()}
          size="md"
          {...props}
      />

    </div>
  )
}

export default DateStackedDefault
