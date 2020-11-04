import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdatedAlign = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="elapsed"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="center"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="elapsed"
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="right"
          showUser="true"
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="elapsed"
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showUser="false"
          timestamp={new Date((new Date()).getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()}
          variant="elapsed"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdatedAlign
