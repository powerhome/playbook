import React from 'react'
import Badge from '../_badge'

const BadgeNotification = (props) => {
  return (
    <>
      <div>
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
      </div>

      <div>
        <Badge
            rounded
            text="1"
            variant="notificationError"
            {...props}
        />

        &nbsp;

        <Badge
            text="4"
            variant="notificationError"
            {...props}
        />
      </div>
    </>
  )
}

export default BadgeNotification
