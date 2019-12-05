import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedDark() {
  return (
    <div>
      <DateStacked
          dark
          date={new Date()}
          size='sm'
      />

      <br />

      <DateStacked
          dark
          date={new Date()}
          size='md'
      />
    </div>
  )
}

export default DateStackedDark
