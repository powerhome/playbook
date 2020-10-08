import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdatedAlign = () => {
  return (
    <div>
      <Timestamp
          align="left"
          name="Maricris Nonato"
          showUser="true"
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
          name="Maricris Nonato"
          showUser="true"
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
          name="Maricris Nonato"
          showUser="true"
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
