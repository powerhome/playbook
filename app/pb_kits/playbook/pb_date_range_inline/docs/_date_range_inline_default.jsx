import React from 'react'
import DateRangeInline from '../_date_range_inline.jsx'

const DateRangeInlineDefault = () => {
  return (
    <div>
      <DateRangeInline
          endDate={new Date('20 Mar 2015')}
          startDate={new Date('18 Jun 2013')}
      />
    </div>
  )
}

export default DateRangeInlineDefault
