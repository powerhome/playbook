import React from 'react'
import Timestamp from '../_timestamp'

const todaysDate = new Date()
const futureYear = new Date().getFullYear() + 4
const pastYear = new Date().getFullYear() - 1
const month = new Date().getMonth()
const date = new Date().getDate()
const hours = new Date().getHours()
const minutes = new Date().getMinutes()
const futureDate = new Date(futureYear, month, date, hours, minutes)
const pastDate = new Date(pastYear, month, date, hours, minutes)

const TimestampAlign = (props) => {
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
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          timestamp={futureDate}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          timestamp={pastDate}
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="center"
          showDate={false}
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          timestamp={futureDate}
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          timestamp={pastDate}
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="right"
          showDate={false}
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          timestamp={futureDate}
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          timestamp={pastDate}
          {...props}
      />
    </div>
  )
}

export default TimestampAlign
