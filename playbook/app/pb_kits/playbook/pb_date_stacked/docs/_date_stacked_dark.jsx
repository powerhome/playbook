import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedDark = () => {
  return (
    <div>
      <DateStacked
          dark
          date={new Date().toLocaleString('en-US', { timeZone: 'Pacific/Tongatapu' })}
          size="sm"
      />

      <br />

      <DateStacked
          dark
          date={new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
          size="md"
      />
    </div>
  )
}

export default DateStackedDark
