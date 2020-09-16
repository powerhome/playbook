import React from 'react'
import Badge from '../_badge.jsx'

const BadgeDefault = (props) => {
  return (
    <div>
      <Badge
          {...props}
          text="+1"
          variant="primary"
      />

      &nbsp;

      <Badge
          {...props}
          text="+4"
          variant="primary"
      />

      &nbsp;

      <Badge
          {...props}
          text="+1000"
          variant="primary"
      />
    </div>
  )
}

export default BadgeDefault
