import React from "react"
import DateRangeStacked from "../_date_range_stacked.jsx"

function DateRangeStackedDark() {
  return (
    <div>
      <DateRangeStacked
        start_date={new Date('18 Jun 2019')}
        end_date={new Date('20 Mar 2020')}
        dark/>

      <br/><br/>

      <DateRangeStacked
        start_date={new Date('2019-06-18T15:49:29Z')}
        end_date={new Date('2020-03-20T15:49:29Z')}
        dark />
    </div>
  )
}

export default DateRangeStackedDark
