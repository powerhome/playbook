import React from 'react'
import Timestamp from '../_timestamp.jsx'

const TimestampUpdatedAlign = (props) => {
  return (
    <div>
      <Timestamp
          align="left"
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="left"
          showUser={false}
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showTimezone
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          showTimezone
          showUser={false}
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="center"
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showUser={false}
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showTimezone
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="center"
          showTimezone
          showUser={false}
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />
      <br />

      <Timestamp
          align="right"
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showUser={false}
          timestamp={new Date().getTime()}
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showTimezone
          showUser
          text="Maricris Nonato"
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />

      <br />

      <Timestamp
          align="right"
          showTimezone
          showUser={false}
          timestamp={new Date().getTime()}
          timezone="America/New_York"
          variant="updated"
          {...props}
      />
    </div>
  )
}

export default TimestampUpdatedAlign
