import React, { Fragment } from 'react'
import Time from '../_time.jsx'

const TimeSizes = (props) => {
  return (
    <Fragment>
      <Time
          date={new Date()}
          {...props}
      />
      <br />
      <Time
          date={new Date()}
          size="md"
          timeZone="America/New_York"
          {...props}
      />
    </Fragment>
  )
}

export default TimeSizes
