import React from 'react'
import Time from '../_time'
import Caption from '../../pb_caption/_caption'
import Title from '../../pb_title/_title'

const TimeUnstyled = (props) => {
  return (
    <>
      <Caption size="xs"
          text="Basic unstyled example"
      />
      <Time
          date={new Date()}
          showIcon
          showTimezone
          timeZone="America/New_York"
          unstyled
          {...props}
      />

      <br />

      <Caption size="xs"
          text="Example with wrapping typography kit"
      />
      <Title size={1}>
        <Time
            date={new Date()}
            showIcon
            showTimezone
            timeZone="America/New_York"
            unstyled
            {...props}
        />
      </Title>

      <br />

      <Caption size="xs"
          text="Example with icon + subcaption"
      />
      <Caption size="xs">
        <Time
            date={new Date()}
            showIcon
            showTimezone
            timeZone="America/New_York"
            unstyled
            {...props}
        />
      </Caption>

      <br />
    </>
  )
}

export default TimeUnstyled
