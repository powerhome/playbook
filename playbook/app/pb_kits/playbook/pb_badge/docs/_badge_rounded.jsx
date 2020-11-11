import React from 'react'
import Badge from '../_badge.jsx'

const BadgeRounded = (props) => {
  return (
    <div>
      <Badge
          {...props}
          rounded
          text="+1"
          variant="primary"
      />

      &nbsp;

      <Badge
          {...props}
          rounded
          text="+4"
          variant="primary"
      />

      &nbsp;

      <Badge
          {...props}
          rounded
          text="+1000"
          variant="primary"
      />
    </div>
  )
}

export default BadgeRounded
