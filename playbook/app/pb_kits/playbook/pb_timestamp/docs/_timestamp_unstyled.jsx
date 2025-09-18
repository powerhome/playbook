import React from 'react'
import Caption from '../../pb_caption/_caption'
import Timestamp from '../../pb_timestamp/_timestamp'
import Title from '../../pb_title/_title'

const TimestampUnstyled = (props) => {
  return (
    <>
      <Caption size="xs"
          text="Basic unstyled example"
      />
      <Timestamp
          timestamp={new Date()}
          unstyled
          {...props}
      />

      <br />

      <Caption size="xs"
          text="Example with wrapping typography kit"
      />
      <Title size={1}>
        <Timestamp
            timestamp={new Date()}
            unstyled
            {...props}
        />
      </Title>
    </>
  )
}

export default TimestampUnstyled
