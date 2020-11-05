import React from 'react'
import { UserBadge } from '../../'

const UserBadgeSize = () => {
  return (
    <div>
      <div>
        <UserBadge
            badge="veteran"
            size="sm"
        />
      </div>
      <br />
      <br />
      <div>
        <UserBadge
            badge="veteran"
            size="md"
        />
      </div>
      <br />
      <br />
      <div>
        <UserBadge
            badge="veteran"
            size="lg"
        />
      </div>
    </div>
  )
}

export default UserBadgeSize
