import React from 'react'
import Time from '../_time.jsx'

const TimeTimezone = (props) => {
  const zones = {
    east: 'America/New_York',
    central: 'America/Chicago',
    mountain: 'America/Denver',
    west: 'America/Los_Angeles',
    asia: 'Asia/Tokyo',
  }
  return (
    <div>
      <h4>{'East Coast'}</h4>
      <Time
          date={new Date()}
          size="md"
          timeZone={zones.east}
          {...props}
      />

      <br />

      <h4>{'Central'}</h4>
      <Time
          date={new Date()}
          timeZone={zones.central}
          {...props}
      />

      <br />

      <h4>{'Mountain'}</h4>
      <Time
          date={new Date()}
          timeZone={zones.mountain}
          {...props}
      />

      <br />

      <h4>{'West Coast'}</h4>
      <Time
          date={new Date()}
          timeZone={zones.west}
          {...props}
      />

      <br />

      <h4>{'Tokyo, Japan'}</h4>
      <Time
          date={new Date()}
          timeZone={zones.asia}
          {...props}
      />

    </div>
  )
}

export default TimeTimezone
