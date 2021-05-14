import React from 'react'

import WeekdayStacked from '../_weekday_stacked'

const WeekdayStackedVariant = (props) => (
  <div>
    <WeekdayStacked
        variant="day_only"
        {...props}
    />
    <WeekdayStacked
        align="center"
        variant="month_day"
        {...props}
    />
    <WeekdayStacked
        align="right"
        variant="expanded"
        {...props}
    />
  </div>
)

export default WeekdayStackedVariant
