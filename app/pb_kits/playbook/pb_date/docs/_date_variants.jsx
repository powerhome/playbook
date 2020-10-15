import React from 'react'
import { Date as FormattedDate } from '../..'

const DateVariants = (props) => {
  return (
    <div>
      <FormattedDate
          value="1995-12-25"
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          showIcon
          value="1995-12-25"
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          showDayOfWeek
          value="1995-12-25"
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          showDayOfWeek
          showIcon
          value="1995-12-25"
          {...props}
      />
    </div>
  )
}

export default DateVariants
