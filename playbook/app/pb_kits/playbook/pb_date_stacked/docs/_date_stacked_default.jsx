import React from 'react'
import DateStacked from '../_date_stacked'

const DateStackedDefault = (props) => {
  return (
    <div>

      <DateStacked
          align="left"
          date={new Date()}
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          date={new Date('20 Mar 2018')}
          size="md"
          {...props}
      />

    </div>
  )
}

export default DateStackedDefault
