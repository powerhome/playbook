import React from 'react'
import { UserBadge } from '../../'

const UserBadgeDefault = () => {
  return (
    <div>
      <div>
        <UserBadge
            badge="veteran"
            dark
            size="md"
        />
      </div>
      <br />
      <br />
      <div>
        <UserBadge
            badge="million-dollar"
            dark
            size="md"
        />
      </div>
    </div>
  )
}

export default UserBadgeDefault
