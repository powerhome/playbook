import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdatedAlign = () => {
  return (
    <div>
      <Timestamp
          align="left"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />

      <Timestamp
          align="left"
          showUser="false"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />
      <br />

      <Timestamp
          align="center"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />

      <Timestamp
          align="center"
          showUser="false"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />
      <br />

      <Timestamp
          align="right"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
      />

      <br />

      <Timestamp
          align="right"
          showUser="false"
          timestamp={new Date().getTime()}
          variant="updated"
      />
    </div>
  )
}

export default TimestampUpdatedAlign
