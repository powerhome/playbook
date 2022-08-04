import React from 'react'
import Badge from '../_badge'

const BadgeDefault = (props) => {
  return (
    <div>
      <Badge
          text="+1"
          variant="primary"
          {...props}
      />

      &nbsp;

      <Badge
          text="+4"
          variant="primary"
          {...props}
      />

      &nbsp;

      <Badge
          text="+1000"
          variant="primary"
          {...props}
      />
    </div>
  )
}

export default BadgeDefault
