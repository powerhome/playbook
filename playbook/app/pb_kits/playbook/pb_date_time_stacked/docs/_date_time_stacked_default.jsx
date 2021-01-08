import React from 'react'
import { DateTimeStacked } from '../../'

const DateTimeStackedDefault = (props) => (
  <div>
    <DateTimeStacked
        date={new Date()}
        {...props}
    />
  </div>
)

export default DateTimeStackedDefault
