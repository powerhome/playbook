import React from 'react'
import { Caption, Date as FormattedDate, Title } from 'playbook-ui'

const DateUnstyled = (props) => {
  return (
    <>
      <Caption size="xs"
          text="Basic unstyled example"
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
            value={new Date('25 Dec 1995')}
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
            value={new Date('25 Dec 1995')}
            {...props}
        />
      </Caption>
    </>
  )
}

export default DateUnstyled
