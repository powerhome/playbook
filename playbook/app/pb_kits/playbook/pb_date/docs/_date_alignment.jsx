import React from 'react'
import { Date as FormattedDate } from '../..'

const DateAlignment = (props) => {
  return (
    <div>
      <FormattedDate
          dayOfWeek
          icon
          value="1995-12-25"
          {...props}
      />

      <br />

      <FormattedDate
          alignment="center"
          dayOfWeek
          icon
          value="2020-12-25"
          {...props}
      />

      <br />

      <FormattedDate
          alignment="right"
          value={new Date()}
          {...props}
      />
    </div>
  )
}

export default DateAlignment
