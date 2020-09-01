import React from 'react'
import { Caption, Date as FormattedDate } from '../..'

const DateTimezoneReact = () => {
  return (
    <div>
      <Caption
          color="light"
          text="East Coast (Default)"
      />
      <FormattedDate
          date={new Date()}
          timeZone="America/New_York"
      />

      <br />
      <Caption
          color="light"
          text="West Coast"
      />
      <FormattedDate
          date={new Date()}
          timeZone="America/Los_Angeles"
      />

      <br />
      <Caption
          color="light"
          text="Tokyo, Japan"
      />
      <FormattedDate
          date={new Date()}
          timeZone="Asia/Tokyo"
      />

    </div>
  )
}

export default DateTimezoneReact
