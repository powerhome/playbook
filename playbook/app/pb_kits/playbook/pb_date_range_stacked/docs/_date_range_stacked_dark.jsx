import React from 'react'
import { DateRangeStacked } from '../../'

const DateRangeStackedDark = (props) => (
  <div>
    <DateRangeStacked
        dark
        endDate={new Date('20 Mar 2020')}
        startDate={new Date('18 Jun 2019')}
        {...props}
    />
  </div>
)

export default DateRangeStackedDark
