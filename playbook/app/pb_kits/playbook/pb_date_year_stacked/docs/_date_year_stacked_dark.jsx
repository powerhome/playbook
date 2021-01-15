import React from 'react'
import { DateYearStacked } from '../../'

const DateYearStackedDark = (props) => {
  return (
    <div>
      <DateYearStacked
          dark
          date={new Date()}
          {...props}
      />
      <DateYearStacked
          align="center"
          dark
          date={new Date()}
          {...props}
      />
      <DateYearStacked
          align="right"
          dark
          date={new Date()}
          {...props}
      />
    </div>
  )
}

export default DateYearStackedDark
