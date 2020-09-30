import React from 'react'
import DateRangeInline from '../_date_range_inline.jsx'

const DateRangeInlineDefault = () => {
  return (
    <div>
      <DateRangeInline
          endDate={new Date('20 Mar 2015')}
          size="xs"
          startDate={new Date('18 Jun 2013')}
      />
      <DateRangeInline
          endDate={new Date('20 Mar 2015')}
          marginTop="xs"
          size="sm"
          startDate={new Date('18 Jun 2013')}
      />
      <DateRangeInline
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          marginTop="md"
          size="xs"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
      />
      <DateRangeInline
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          marginTop="xs"
          size="sm"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
      />
    </div>
  )
}

export default DateRangeInlineDefault
