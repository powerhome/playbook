import React from "react"
import DateRangeInline from "../_date_range_inline.jsx"

function DateRangeInlineDefault() {
  return (
    <div>
      <DateRangeInline
          endDate={new Date('20 Mar 2020')}
          startDate={new Date('18 Jun 2019')}
      />
    </div>
  )
}

export default DateRangeInlineDefault
