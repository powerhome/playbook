import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedNotCurrentYear = (props) => {
  return (
    <div>

      <DateStacked
          date={new Date('20 Mar 2018')}
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          date={new Date('20 Mar 2018')}
          size="md"
          {...props}
      />

    </div>
  )
}

export default DateStackedNotCurrentYear
