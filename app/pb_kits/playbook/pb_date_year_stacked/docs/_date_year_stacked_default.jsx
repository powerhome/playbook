import React from "react"
import { DateYearStacked } from "../../"

function DateYearStackedDefault() {
  return (
    <div>
      <DateYearStacked date={new Date() } />
      <DateYearStacked align='center' date={new Date() } />
      <DateYearStacked align='right' date={new Date() } />
    </div>
  )
}

export default DateYearStackedDefault;
