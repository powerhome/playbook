import React from 'react'
import { DateYearStacked } from '../../'

const DateYearStackedDefault = (props) => {
  return (
    <div>
      <DateYearStacked date={new Date()} />
      <DateYearStacked
          align="center"
          date={new Date()}
          {...props}
      />
      <DateYearStacked
          align="right"
          date={new Date()}
          {...props}
      />
    </div>
  )
}

export default DateYearStackedDefault
