import React from "react"
import DateRangeInline from "../_date_range_inline.jsx"

function DateRangeInlineDefault() {
  return (
    <div>
      <DateRangeInline startDate={new Date('18 Jun 2019')} endDate={new Date('20 Mar 2020')} />
    </div>
  )
}

export default DateRangeInlineDefault;
