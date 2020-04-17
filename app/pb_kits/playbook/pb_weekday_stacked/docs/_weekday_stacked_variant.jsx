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
        align="center"
        variant="month_day"
    />
    <WeekdayStacked
        align="right"
        variant="expanded"
    />
  </div>
)

export default WeekdayStackedVariant
