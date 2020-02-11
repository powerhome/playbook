import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedNotCurrentYear = () => {
  return (
    <div>

      <DateStacked
          date={new Date('20 Mar 2018')}
          size="sm"
      />

      <br />

      <DateStacked
          date="2018-03-20"
          size="md"
      />

    </div>
  )
}

export default DateStackedNotCurrentYear
