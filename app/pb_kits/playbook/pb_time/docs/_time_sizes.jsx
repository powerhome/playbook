import React, { Fragment } from 'react'
import Time from '../_time.jsx'

const TimeSizes = () => {
  return (
    <Fragment>
      <Time
          date={new Date()}
      />
      <br />
      <Time
          date={new Date()}
          size="md"
      />
    </Fragment>
  )
}

export default TimeSizes
