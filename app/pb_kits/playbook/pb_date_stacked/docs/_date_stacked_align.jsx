import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedAlign() {
  return (
    <div>
      <DateStacked
          date={new Date()}
          size='sm'
      />

      <br />

      <DateStacked
          align='center'
          date={new Date()}
      />

      <br />

      <DateStacked
          align='right'
          date={new Date()}
      />

      <br />

      <DateStacked
          date={new Date()}
          size='md'
      />

      <br />

      <DateStacked
          align='center'
          date={new Date()}
          size='md'
      />

      <br />

      <DateStacked
          align='right'
          date={new Date()}
          size='md'
      />

    </div>
  )
}

export default DateStackedAlign
