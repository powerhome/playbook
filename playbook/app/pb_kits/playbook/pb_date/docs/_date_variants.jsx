import React from 'react'
import { Date as FormattedDate } from '../..'

const DateVariants = (props) => {
  return (
    <div>
      <FormattedDate
          {...props}
          value="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          {...props}
          showIcon
          value="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          {...props}
          showDayOfWeek
          value="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          {...props}
          showDayOfWeek
          showIcon
          value="1995-12-25"
      />
    </div>
  )
}

export default DateVariants
