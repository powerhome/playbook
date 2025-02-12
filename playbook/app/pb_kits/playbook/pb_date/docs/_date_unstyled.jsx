import React from 'react'
import { Caption, Date as FormattedDate, Title } from 'playbook-ui'

const DateUnstyled = (props) => {
  return (
    <>
      <Caption {...props}
          size="xs"
          text="Basic unstyled example"
      />
      <FormattedDate
          unstyled
          value={new Date()}
          {...props}
      />

      <br />

      <Caption {...props}

          size="xs"
          text="Example with wrapping typography kit"
      />
      <Title {...props}
          size={1}
      >
        <FormattedDate
            unstyled
            value={new Date('25 Dec 1995')}
            {...props}
        />
      </Title>

      <br />

      <Caption {...props}
          size="xs"
          text="Example with icon + subcaption"
      />
      <Caption {...props}
          size="xs"
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
