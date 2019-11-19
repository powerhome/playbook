import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedDefault() {
  return (
    <div>
      
      <DateStacked date={new Date()} align='left' size='sm'/>

      <br/>

      <DateStacked date={new Date()} size='md'/>

    </div>
  )
}

export default DateStackedDefault;
