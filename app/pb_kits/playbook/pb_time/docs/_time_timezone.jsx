import React from 'react'
import Time from '../_time.jsx'

const TimeTimeZone = () => {
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
          date={new Date().toLocaleString('en-US', { timeZone: zones.east })}
          size="lg"
          timeZone={zones.east}
      />
      <br />
      <br />
      <h4>{'Central'}</h4>
      <Time
          date={new Date().toLocaleString('en-US', { timeZone: zones.central })}
          size="sm"
          timeZone={zones.central}
      />
      <br />
      <br />
      <h4>{'Mountain'}</h4>
      <Time
          date={new Date().toLocaleString('en-US', { timeZone: zones.mountain })}
          size="sm"
          timeZone={zones.mountain}
      />

      <br />
      <br />
      <h4>{'West Coast'}</h4>
      <Time
          date={new Date().toLocaleString('en-US', { timeZone: zones.west })}
          size="sm"
          timeZone={zones.west}
      />

      <br />
      <br />
      <h4>{'Tokyo, Japan'}</h4>
      <Time
          date={new Date('2012-08-02T09:49:29Z').toLocaleString('en-US', { timeZone: zones.asia })}
          size="sm"
          timeZone={zones.asia}
      />

    </div>
  )
}

export default TimeTimeZone
