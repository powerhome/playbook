import React from 'react'
import { Date as FormattedDate } from '../..'

const DateVariants = () => {
  return (
    <div>
      <FormattedDate
          value="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          showIcon
          value="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          showDayOfWeek
          value="1995-12-25"
      />

      <br />
      <br />

      <FormattedDate
          showDayOfWeek
          showIcon
          value="1995-12-25"
      />
    </div>
  )
}

export default DateVariants
