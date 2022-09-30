import React from 'react'
import DateStacked from '../_date_stacked'

const DateStackedAlign = (props) => {
  return (
    <div>
      <DateStacked
          date={new Date()}
          size="sm"
          {...props}
      />

      <br />

      <DateStacked
          align="center"
          date={new Date()}
          {...props}
      />

      <br />

      <DateStacked
          align="right"
          date={new Date()}
          {...props}
      />

      <br />

      <DateStacked
          date={new Date()}
          size="md"
          {...props}
      />

      <br />

      <DateStacked
          align="center"
          date={new Date()}
          size="md"
          {...props}
      />

      <br />

      <DateStacked
          align="right"
          date={new Date()}
          size="md"
          {...props}
      />

    </div>
  )
}

export default DateStackedAlign
