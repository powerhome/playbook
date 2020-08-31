import React from 'react'
import { Date as FormattedDate } from '../..'

const DateVariants = () => {
  return (
    <div>
      <FormattedDate
          date="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          date="1995-12-25"
          showIcon
      />

      <br />
      <br />

      <FormattedDate
          date="1995-12-25"
          showDayOfWeek
      />

      <br />
      <br />

      <FormattedDate
          date="1995-12-25"
          showDayOfWeek
          showIcon
      />
    </div>
  )
}

export default DateVariants
