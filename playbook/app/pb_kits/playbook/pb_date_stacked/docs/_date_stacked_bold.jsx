import React from 'react'
import DateStacked from '../_date_stacked.jsx'

const DateStackedBold = () => {
  return (
    <div>
      <DateStacked
          align="left"
          bold
          date={new Date()}
      />

      <br />

      <DateStacked
          align="center"
          bold
          date={new Date('20 Mar 2018')}
      />

      <br />

      <DateStacked
          align="right"
          bold
          date={new Date()}
      />

      <br />

    </div>
  )
}

export default DateStackedBold
