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

const TimestampTimezones = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate={false}
          showTimezone
          timestamp={todaysDate}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={todaysDate}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={futureDate}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={pastDate}
          timezone="America/New_York"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate={false}
          showTimezone
          timestamp={todaysDate}
          timezone="Asia/Hong_Kong"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={todaysDate}
          timezone="Asia/Hong_Kong"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={futureDate}
          timezone="Asia/Hong_Kong"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          showTimezone
          timestamp={pastDate}
          timezone="Asia/Hong_Kong"
          {...props}
      />
    </div>
  )
}

export default TimestampTimezones
