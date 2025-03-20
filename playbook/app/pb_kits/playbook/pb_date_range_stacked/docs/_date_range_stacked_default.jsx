import React from 'react'
import DateRangeStacked from '../../pb_date_range_stacked/_date_range_stacked'

const DateRangeStackedDefault = (props) => (
  <div>
    <DateRangeStacked
        endDate={new Date('20 Mar 2020')}
        startDate={new Date('18 Jun 2019')}
        {...props}
    />
  </div>
)

export default DateRangeStackedDefault
