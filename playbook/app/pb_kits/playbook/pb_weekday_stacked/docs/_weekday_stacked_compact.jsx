import React from 'react'

import WeekdayStacked from '../_weekday_stacked'

const WeekdayStackedCompact = (props) => (
  <div>
    <WeekdayStacked
        compact
        variant="day_only"
        {...props}
    />
    <WeekdayStacked
        align="center"
        compact
        variant="month_day"
        {...props}
    />
    <WeekdayStacked
        align="right"
        compact
        variant="expanded"
        {...props}
    />
  </div>
)

export default WeekdayStackedCompact
