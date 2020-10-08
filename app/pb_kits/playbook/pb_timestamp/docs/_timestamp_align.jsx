import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampAlign = () => {
  return (
    <div>
      <Timestamp
          align="left"
          showDate="false"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="left"
          showDate="true"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="left"
          showDate="true"
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate() + 1)).getTime()}
      />

      <br />
      <br />

      <Timestamp
          align="center"
          showDate="false"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="center"
          showDate="true"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="center"
          showDate="true"
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate() + 1)).getTime()}
      />

      <br />
      <br />

      <Timestamp
          align="right"
          showDate="false"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="right"
          showDate="true"
          timestamp={new Date().getTime()}
      />

      <br />

      <Timestamp
          align="right"
          showDate="true"
          timestamp={new Date((new Date()).getFullYear() + 4, (new Date().getMonth()), (new Date().getDate() + 1)).getTime()}
      />
    </div>
  )
}

export default TimestampAlign
