import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampAlign = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate={false}
          timestamp={new Date().getTime()}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          timestamp={new Date().getTime()}
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showDate
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate()), (new Date().getHours()), (new Date().getMinutes()))}
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="center"
          showDate={false}
          timestamp={new Date().getTime()}
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showDate
          timestamp={new Date().getTime()}
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showDate
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate()), (new Date().getHours()), (new Date().getMinutes()))}
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="right"
          showDate={false}
          timestamp={new Date().getTime()}
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showDate
          timestamp={new Date().getTime()}
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showDate
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate()), (new Date().getHours()), (new Date().getMinutes()))}
          {...props}
      />
    </div>
  )
}

export default TimestampAlign
