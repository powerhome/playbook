import React from 'react'
import {
  WeekdayStacked,
} from '../../'

const WeekdayStackedCompact = () => (
  <div>
    <WeekdayStacked
        compact
        variant="day_only"
    />
    <WeekdayStacked
        align="center"
        compact
        variant="month_day"
    />
    <WeekdayStacked
        align="right"
        compact
        variant="expanded"
    />
  </div>
)

export default WeekdayStackedCompact
