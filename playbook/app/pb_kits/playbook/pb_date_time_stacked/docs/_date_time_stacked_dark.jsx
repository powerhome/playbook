import React from 'react'
import { DateTimeStacked } from '../../'

const DateTimeStackedDark = () => (
  <div>
    <DateTimeStacked
        dark
        date={new Date()}
    />
    <br />
    <DateTimeStacked
        dark
        date={new Date('20 Mar 2018')}
    />
  </div>
)

export default DateTimeStackedDark
