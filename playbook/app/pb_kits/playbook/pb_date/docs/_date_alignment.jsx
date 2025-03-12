import React from 'react'

import { Date as FormattedDate } from '../../pb_date/_date'

const DateAlignment = (props) => {
  return (
    <div>
      <FormattedDate
          dayOfWeek
          icon
          value={new Date('25 Dec 1995')}
          {...props}
      />

      <br />

      <FormattedDate
          alignment="center"
          dayOfWeek
          icon
          value={new Date('25 Dec 2020')}
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
