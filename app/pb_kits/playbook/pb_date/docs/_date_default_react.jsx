import React from 'react'
import { Date as FormattedDate } from '../..'

const DateDefaultReact = () => {
  return (
    <div>
      <FormattedDate
          date={new Date()}
      />

      <br />

      <FormattedDate
          date={new Date('2012-08-03')}
      />

    </div>
  )
}

export default DateDefaultReact
