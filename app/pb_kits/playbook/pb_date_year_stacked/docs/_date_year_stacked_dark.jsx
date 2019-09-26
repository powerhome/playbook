import React from "react"
import { DateYearStacked } from "../../"

function DateYearStackedDark() {
  return (
    <div>
      <DateYearStacked date={new Date() } dark />
      <DateYearStacked align='center' date={new Date() } dark />
      <DateYearStacked align='right' date={new Date() } dark />
    </div>
  )
}

export default DateYearStackedDark
