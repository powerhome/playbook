import React from 'react'
import {
  WeekdayStacked,
} from '../../'

const WeekdayStackedVariant = () => (
  <div>
    <WeekdayStacked
        variant="day_only"
    />
    <WeekdayStacked
        variant="compact"
    />
    <WeekdayStacked
        variant="month_expanded"
    />
  </div>
)

export default WeekdayStackedVariant
