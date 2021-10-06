import React from 'react'
import Timestamp from '../_timestamp.jsx'

const todaysDate = new Date()
const futureYear = new Date().getFullYear() + 4
const pastYear = new Date().getFullYear() - 1
const month = new Date().getMonth()
const date = new Date().getDate()
const hours = new Date().getHours()
const minutes = new Date().getMinutes()
const futureDate = new Date(futureYear, month, date, hours, minutes)
const pastDate = new Date(pastYear, month, date, hours, minutes)

const TimestampDefault = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate={false}
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          timestamp={futureDate}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          timestamp={pastDate}
          {...props}
      />
    </div>
  )
}

export default TimestampDefault
