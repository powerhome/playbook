import React from 'react'
import DateYearStacked from '../../pb_date_year_stacked/_date_year_stacked'

const DateYearStackedDefault = (props) => {
  return (
    <div>
      <DateYearStacked
          date={new Date()}
          {...props}
      />
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
