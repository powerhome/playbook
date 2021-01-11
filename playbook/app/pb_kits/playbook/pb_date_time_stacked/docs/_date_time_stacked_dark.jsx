import React from 'react'
import { DateTimeStacked } from '../../'

const DateTimeStackedDark = (props) => (
  <div>
    <DateTimeStacked
        dark
        date={new Date()}
        {...props}
    />
  </div>
)

export default DateTimeStackedDark
