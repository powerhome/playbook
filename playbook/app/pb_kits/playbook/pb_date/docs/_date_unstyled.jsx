import React from 'react'
import { Caption, Date as FormattedDate, Title } from '../../'

const DateUnstyled = (props) => {
  return (
    <>
      <Caption size="xs"
          text="Example with no year"
      />
      <FormattedDate
          unstyled
          value={new Date()}
          {...props}
      />

      <br />

      <Caption size="xs"
          text="Example with wrapping typography kit"
      />
      <Title size={1}>
        <FormattedDate
            unstyled
            value="1995-12-25"
            {...props}
        />
      </Title>

      <br />

      <Caption size="xs"
          text="Example with icon + subcaption"
      />
      <Caption size="xs">
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
