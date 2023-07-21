import React from 'react'
import { Date as FormattedDate } from '../..'

const DateVariants = (props) => {
  return (
    <div>
      <FormattedDate
          showIcon
          size="sm"
          value={new Date('25 Dec 1995')}
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          value={new Date('25 Dec 1995')}
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          showIcon
          value={new Date('25 Dec 1995')}
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          showDayOfWeek
          value={new Date('25 Dec 1995')}
          {...props}
      />

      <br />
      <br />

      <FormattedDate
          showDayOfWeek
          showIcon
          value={new Date('25 Dec 1995')}
          {...props}
      />
    </div>
  )
}

export default DateVariants
