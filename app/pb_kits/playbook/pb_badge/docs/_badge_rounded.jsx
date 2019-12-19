import React from 'react'
import Badge from '../_badge.jsx'

const BadgeRounded = () => {
  return (
    <div>
      <Badge
          rounded
          text="+1"
          variant="primary"
      />

      &nbsp;

      <Badge
          rounded
          text="+4"
          variant="primary"
      />

      &nbsp;

      <Badge
          rounded
          text="+1000"
          variant="primary"
      />
    </div>
  )
}

export default BadgeRounded
