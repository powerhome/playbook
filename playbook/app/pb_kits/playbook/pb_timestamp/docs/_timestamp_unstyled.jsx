import React from "react"
import { Caption, Timestamp, Title } from "../../"

const TimestampUnstyled = props => {
  return (
    <>
      <Caption size="xs" text="Basic unstyled example" />
      <Timestamp
        align="left"
        showDate
        timestamp={new Date()}
        unstyled
        {...props}
      />

      <br />

      <Caption size="xs" text="Example with wrapping typography kit" />
      <Title size={1}>
        <Timestamp
          align="left"
          showDate
          timestamp={new Date()}
          unstyled
          {...props}
        />
      </Title>
    </>
  )
}

export default TimestampUnstyled
