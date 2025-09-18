import React from 'react'
import Timestamp from '../_timestamp'

const todaysDate = new Date()
const year = new Date().getFullYear()
const month = new Date().getMonth()
const date = new Date().getDate()
const hours = new Date().getHours() - 10
const minutes = new Date().getMinutes()
const customDate = new Date(year, month, date, hours, minutes)

const TimestampElapsed = (props) => {
  return (
    <div>
      <Timestamp
          showUser
          text="Maricris Nonato"
          timestamp={todaysDate}
          variant="elapsed"
          {...props}
      />

      <br />

      <Timestamp
          timestamp={customDate}
          variant="elapsed"
          {...props}
      />

      <br />

      <Timestamp
          hideUpdated
          timestamp={customDate}
          variant="elapsed"
          {...props}
      />
    </div>
  )
}

export default TimestampElapsed
