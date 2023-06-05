import React from 'react'
import { Caption, Date as FormattedDate, Title } from '../../'

const DateUnstyled = (props) => {
  return (
    <>
      <FormattedDate
          unstyled
          value={new Date()}
          {...props}
      />

      <br />

      <FormattedDate
          unstyled
          value="2012-08-03"
          {...props}
      />

      <br />

      <FormattedDate
          showDayOfWeek
          unstyled
          value="2017-12-03"
          {...props}
      />

      <br />

      <FormattedDate
          showIcon
          unstyled
          value="1995-12-25"
          {...props}
      />

      <br />

      <FormattedDate
          showDayOfWeek
          showIcon
          unstyled
          value="1995-12-25"
          {...props}
      />

      <br />

      <Title size={1}>
        <FormattedDate
            showDayOfWeek
            showIcon
            unstyled
            value="1995-12-25"
            {...props}
        />
      </Title>

      <br />

      <Caption>
        <FormattedDate
            showDayOfWeek
            showIcon
            unstyled
            value="1995-12-25"
            {...props}
        />
      </Caption>
    </>
  )
}

export default DateUnstyled
