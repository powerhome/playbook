import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedDefault() {
  return (
    <div>

      <DateStacked align='center' date={new Date() }/>

      <br/>

      <DateStacked date={new Date('18 Jun 2019')} align='center'/>

      <br/>

      <DateStacked align='right' size='md' date={new Date('2019-06-18T15:49:29Z')} />

    </div>
  )
}

export default DateStackedDefault;
