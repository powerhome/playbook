import React from 'react'
import { DateRangeStacked } from '../../'

const DateRangeStackedDefault = () => (
  <div>
    <DateRangeStacked
        endDate={new Date('20 Mar 2020')}
        startDate={new Date('18 Jun 2019')}
    />
  </div>
)

export default DateRangeStackedDefault
