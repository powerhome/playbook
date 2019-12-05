import React from "react"
import { DateYearStacked } from "../../"

function DateYearStackedDark() {
  return (
    <div>
      <DateYearStacked
          dark
          date={new Date()}
      />
      <DateYearStacked
          align='center'
          dark
          date={new Date()}
      />
      <DateYearStacked
          align='right'
          dark
          date={new Date()}
      />
    </div>
  )
}

export default DateYearStackedDark
