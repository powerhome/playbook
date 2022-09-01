import React from 'react'
import DateRangeInline from '../_date_range_inline'

const DateRangeInlineDefault = (props) => {
  return (
    <div>
      <DateRangeInline
          endDate={new Date('20 Mar 2015')}
          size="xs"
          startDate={new Date('18 Jun 2013')}
          {...props}
      />
      <DateRangeInline
          endDate={new Date('20 Mar 2015')}
          size="sm"
          startDate={new Date('18 Jun 2013')}
          {...props}
      />
      <br />
      <br />
      <DateRangeInline
          align="center"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="xs"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
          {...props}
      />
      <DateRangeInline
          align="center"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="sm"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
          {...props}
      />
      <br />
      <br />
      <DateRangeInline
          align="right"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="xs"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
          {...props}
      />
      <DateRangeInline
          align="right"
          endDate={new Date(`15 Aug ${new Date().getFullYear()}`)}
          icon
          size="sm"
          startDate={new Date(`15 Jan ${new Date().getFullYear()}`)}
          {...props}
      />
    </div>
  )
}

export default DateRangeInlineDefault
