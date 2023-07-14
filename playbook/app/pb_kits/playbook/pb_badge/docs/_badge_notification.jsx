import React from 'react'
import Badge from '../_badge'

const BadgeNotification = (props) => {
  return (
    <>
      <Badge
          rounded
          text="1"
          variant="notification"
          {...props}
      />

      &nbsp;

      <Badge
          text="4"
          variant="notification"
          {...props}
      />
    </>
  )
}

export default BadgeNotification
