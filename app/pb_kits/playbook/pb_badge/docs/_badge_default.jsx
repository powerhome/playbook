import React from 'react'
import Badge from '../_badge.jsx'

const BadgeDefault = () => {
  return (
    <div>
      <Badge
          text="+1"
          variant="primary"
      />

      &nbsp;

      <Badge
          text="+4"
          variant="primary"
      />

      &nbsp;

      <Badge
          text="+1000"
          variant="primary"
      />
    </div>
  )
}

export default BadgeDefault
