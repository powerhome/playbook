import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedSizes = (props) => {
  return (
    <div>
      <DateStacked
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

export default DateStackedSizes
