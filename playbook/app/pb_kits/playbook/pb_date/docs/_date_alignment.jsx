import React from 'react'
import { Date as FormattedDate } from '../..'

const DateAlignment = (props) => {
  return (
    <div>
      <FormattedDate
          {...props}
          dayOfWeek
          icon
          value="1995-12-25"
      />

      <br />

      <FormattedDate
          {...props}
          alignment="center"
          dayOfWeek
          icon
          value="2020-12-25"
      />

      <br />

      <FormattedDate
          {...props}
          alignment="right"
          value={new Date()}
      />
    </div>
  )
}

export default DateAlignment
