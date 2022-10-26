import React from 'react'
import DateStacked from '../_date_stacked'

const DateStackedBold = (props) => {
  return (
    <div>
      <DateStacked
          align="left"
          bold
          date={new Date()}
          {...props}
      />

      <br />

      <DateStacked
          align="center"
          bold
          date={new Date('20 Mar 2018')}
          {...props}
      />

      <br />

      <DateStacked
          align="right"
          bold
          date={new Date()}
          {...props}
      />

      <br />

    </div>
  )
}

export default DateStackedBold
