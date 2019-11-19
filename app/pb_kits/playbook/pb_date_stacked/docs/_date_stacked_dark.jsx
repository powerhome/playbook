import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedDark() {
  return (
    <div>
      <DateStacked 
        date={new Date()}
        size='sm'
        dark={true}
      />

      <br></br>

      <DateStacked 
        date={new Date()}
        size='md'
        dark={true}
      />
    </div>
  )
}

export default DateStackedDark;
