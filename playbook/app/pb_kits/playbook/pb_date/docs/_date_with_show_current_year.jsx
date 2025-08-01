import React from 'react'

import FormattedDate from '../../pb_date/_date'

const DateWithShowCurrentYear = (props) => {
  return (
    <>
      <FormattedDate
          showCurrentYear
          value={new Date()}
          {...props}
      />
    </>
  )
}

export default DateWithShowCurrentYear
