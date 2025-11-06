import React from 'react'
import DateStacked from '../_date_stacked'

const DateStackedCurrentYear = (props) => {
  return (
    <div>

      <DateStacked
          date={new Date()}
          showCurrentYear
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          date={new Date()}
          showCurrentYear
          size="md"
          {...props}
      />
    </div>
  )
}

export default DateStackedCurrentYear
