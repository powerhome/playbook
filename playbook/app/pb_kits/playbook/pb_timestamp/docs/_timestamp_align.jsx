import React from 'react'
import Timestamp from '../_timestamp.jsx'

const todaysDate = new Date()
const year = new Date().getFullYear() + 4
const month = new Date().getMonth()
const date = new Date().getDate()
const hours = new Date().getHours()
const minutes = new Date().getMinutes()
const customDate = new Date(year, month, date, hours, minutes)

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
          showDate
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          timestamp={customDate}
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
          showDate
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showDate
          timestamp={customDate}
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
          showDate
          timestamp={todaysDate}
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showDate
          timestamp={customDate}
          {...props}
      />
    </div>
  )
}

export default TimestampAlign
