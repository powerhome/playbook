import React from "react"
import DateStacked from "../_date_stacked.jsx"

function DateStackedAlign() {
  return (
    <div>
      <DateStacked date={new Date()} size='sm'/>

      <br/>

      <DateStacked date={new Date()} align='center'/>  

      <br/>

      <DateStacked date={new Date()} align='right'/>
      
      <br/>

      <DateStacked date={new Date()} size='md'/>

      <br/>

      <DateStacked date={new Date()} size='md' align='center'/>  

      <br/>

      <DateStacked date={new Date()} size='md' align='right'/>

    </div>
  )
}

export default DateStackedAlign;
