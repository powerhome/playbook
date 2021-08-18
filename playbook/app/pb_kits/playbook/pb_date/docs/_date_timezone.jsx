import React from 'react'
import { Date as FormattedDate } from '../../'

const DateTimezone = (props) => {
  return (
    <>
      <p>{'If the value you send only contains a date with no time and timezone, you will receive the date beginning at 00:00'}</p>
      <FormattedDate
          showDayOfWeek
          timeZone="Asia/Tokyo"
          value="2012-07-02"
          {...props}
      />
      <br />
      <br />
      <p>{'Here we are sending the time and zone along with the date in UTC. This will be the starting date and time which is then converted to the zone you specified.'}</p>
      <FormattedDate
          showDayOfWeek
          timeZone="Asia/Tokyo"
          value="2012-07-02 19:00:00 UTC"
          {...props}
      />
    </>
  )
}

export default DateTimezone
