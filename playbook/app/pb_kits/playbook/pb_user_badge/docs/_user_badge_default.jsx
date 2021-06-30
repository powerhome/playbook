import React from 'react'

import UserBadge from '../_user_badge'

const UserBadgeDefault = () => {
  return (
    <div>
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
            badge="million-dollar"
            size="md"
        />
      </div>
    </div>
  )
}

export default UserBadgeDefault
