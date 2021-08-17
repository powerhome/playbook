import React from 'react'
import { Date as FormattedDate } from '../../'

const DateTimezone = (props) => {
  return (
    <>
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
