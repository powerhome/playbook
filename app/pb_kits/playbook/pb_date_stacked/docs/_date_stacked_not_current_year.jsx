import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedNotCurrentYear() {
  return (
    <div>
      
      <DateStacked
          date={new Date('20 Mar 2018')}
          size='sm'
      />

      <br />

      <DateStacked
          date={new Date('20 Mar 2018')}
          size='md'
      />

    </div>
  )
}

export default DateStackedNotCurrentYear
