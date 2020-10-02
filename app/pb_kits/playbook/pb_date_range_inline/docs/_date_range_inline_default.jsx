import React from 'react'
import DateRangeInline from '../_date_range_inline.jsx'

const DateRangeInlineDefault = (props) => {
  return (
    <div>
      <DateRangeInline
          {...props}
          endDate={new Date('20 Mar 2015')}
          size="xs"
          startDate={new Date('18 Jun 2013')}
      />
      <DateRangeInline
          {...props}
          endDate={new Date('20 Mar 2015')}
          size="sm"
          startDate={new Date('18 Jun 2013')}
      />
      <br />
      <br />
      <DateRangeInline
          {...props}
          align="center"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="xs"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
      />
      <DateRangeInline
          {...props}
          align="center"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="sm"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
      />
      <br />
      <br />
      <DateRangeInline
          {...props}
          align="right"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="xs"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
      />
      <DateRangeInline
          {...props}
          align="right"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="sm"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
      />
    </div>
  )
}

export default DateRangeInlineDefault
