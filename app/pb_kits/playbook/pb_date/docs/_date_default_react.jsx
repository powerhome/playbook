import React from 'react'
import { Date as FormattedDate } from '../..'

const DateDefaultReact = () => {
  return (
    <div>
      <FormattedDate
          date="2012-12-25"
      />

      <br />

      <FormattedDate
          date={new Date()}
      />
    </div>
  )
}

export default DateDefaultReact
