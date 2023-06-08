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
          date={new Date().getTime()}
          showIcon
          showTimezone={false}
          unstyled
          {...props}
      />

      <br />

      <Caption size="xs"
          text="Example with wrapping typography kit"
      />
      <Title size={1}>
        <Time
            date={new Date().getTime()}
            showTimezone={false}
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
            date={new Date().getTime()}
            showIcon
            showTimezone={false}
            unstyled
            {...props}
        />
      </Caption>

      <br />
    </>
  )
}

export default TimeUnstyled
