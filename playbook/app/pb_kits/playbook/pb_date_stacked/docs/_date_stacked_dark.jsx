import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedDark = (props) => {
  return (
    <div>
      <DateStacked
          dark
          date={new Date().toLocaleString('en-US', { timeZone: 'Pacific/Tongatapu' })}
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          dark
          date={new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
          size="md"
          {...props}
      />
    </div>
  )
}

export default DateStackedDark
