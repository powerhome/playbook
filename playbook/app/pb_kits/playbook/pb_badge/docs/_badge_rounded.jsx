import React from 'react'
import Badge from '../_badge'

const BadgeRounded = (props) => {
  return (
    <div>
      <Badge
          rounded
          text="+1"
          variant="primary"
          {...props}
      />

      &nbsp;

      <Badge
          rounded
          text="+4"
          variant="primary"
          {...props}
      />

      &nbsp;

      <Badge
          rounded
          text="+1000"
          variant="primary"
          {...props}
      />
    </div>
  )
}

export default BadgeRounded
