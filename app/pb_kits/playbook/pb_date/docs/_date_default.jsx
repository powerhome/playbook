import React from 'react'
import { Date as FormattedDate } from '../../'

const DateDefault = () => {
  return (
    <div>
      <FormattedDate
          date="2012-12-25"
      />

      <FormattedDate
          date={new Date()}
      />
    </div>
  )
}

export default DateDefault
