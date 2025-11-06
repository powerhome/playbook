import React from 'react'
import DateRangeInline from '../_date_range_inline'

const DateRangeInlineShowCurrentYear = (props) => {
  return (
    <div>
      <DateRangeInline
          endDate={new Date(`7 Dec ${new Date().getFullYear()}`)}
          showCurrentYear
          size="xs"
          startDate={new Date(`31 Oct ${new Date().getFullYear()}`)}
          {...props}
      />
      <DateRangeInline
          endDate={new Date(`7 Dec ${new Date().getFullYear()}`)}
          showCurrentYear
          size="sm"
          startDate={new Date(`31 Oct ${new Date().getFullYear()}`)}
          {...props}
      />
      <DateRangeInline
          align="center"
          endDate={new Date(`7 Dec ${new Date().getFullYear()}`)}
          icon
          showCurrentYear
          size="xs"
          startDate={new Date(`31 Oct ${new Date().getFullYear()}`)}
          {...props}
      />
      <DateRangeInline
          align="center"
          endDate={new Date(`7 Dec ${new Date().getFullYear()}`)}
          icon
          showCurrentYear
          size="sm"
          startDate={new Date(`31 Oct ${new Date().getFullYear()}`)}
          {...props}
      />
    </div>
  )
}

export default DateRangeInlineShowCurrentYear
