import React from 'react'
import {
  WeekdayStacked,
} from '../../'

const WeekdayStackedDefault = (props) => (
  <div>
    <WeekdayStacked
        className="test"
        {...props}
    />
    <WeekdayStacked
        align="center"
        {...props}
    />
    <WeekdayStacked
        align="right"
        {...props}
    />
  </div>
)

export default WeekdayStackedDefault
