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
          variant="elapsed"
      />

      <br />

      <Timestamp
          align="left"
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
      />

      <br />
      <br />

      <Timestamp
          align="center"
          name="Maricris Nonato"
          showUser="true"
          timestamp={new Date().getTime()}
          variant="elapsed"
      />

      <br />

      <Timestamp
          align="center"
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
      />

      <br />
      <br />

      <Timestamp
          align="right"
          name="Maricris Nonato"
          showUser="true"
          timestamp={new Date().getTime()}
          variant="elapsed"
      />

      <br />

      <Timestamp
          align="right"
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
      />
    </div>
  )
}

export default TimestampUpdatedAlign
