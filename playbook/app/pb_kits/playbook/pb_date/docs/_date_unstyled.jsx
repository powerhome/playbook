import React from 'react'
import { Caption, Date as FormattedDate, Title } from 'playbook-ui'

const DateUnstyled = (props) => {
  return (
    <>
      <Caption size="xs"
          text="Basic unstyled example"
          {...props}

      />
      <FormattedDate
          unstyled
          value={new Date()}
          {...props}
      />

      <br />

      <Caption size="xs"
          text="Example with wrapping typography kit"
          {...props}

      />
      <Title size={1}
          {...props}
      >
        <FormattedDate
            unstyled
            value={new Date('25 Dec 1995')}
            {...props}
        />
      </Title>

      <br />

      <Caption size="xs"
          text="Example with icon + subcaption"
          {...props}

      />
      <Caption size="xs"
          {...props}
      >
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
