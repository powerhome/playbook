import React from 'react'
import { UserBadge } from '../..'

const UserBadgeSizeDark = () => {
  return (
    <div>
      <div>
        <UserBadge
            badge="veteran"
            dark
            size="sm"
        />
      </div>
      <br />
      <br />
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
            badge="veteran"
            dark
            size="lg"
        />
      </div>
    </div>
  )
}

export default UserBadgeSizeDark
