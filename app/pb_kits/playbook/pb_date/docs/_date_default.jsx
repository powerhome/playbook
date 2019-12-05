import React from "react"
import {Date} from "../../"

const DateDefault = () => {
  return (
    <div>
      <Date size='lg' value='1995-12-25' />

      <br/>

      <Date value='17 Mar 69' />

      <br/>

      <Date size='xs' value='2020-04-20T04:20:00.000Z' />
    </div>
  )
}

export default DateDefault
