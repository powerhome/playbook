import React from 'react'
import { UserBadge } from '../../'

const UserBadgeSize = () => {
  return (
    <div>
      <UserBadge
          badge="veteran"
          size="sm"
      />

      <UserBadge
          badge="veteran"
          size="md"
      />

      <UserBadge
          badge="veteran"
          size="lg"
      />
    </div>
  )
}

export default UserBadgeSize
