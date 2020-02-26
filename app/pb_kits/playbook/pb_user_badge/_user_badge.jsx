/* @flow */
import React from 'react'

type UserBadgeProps = {
  className?: String,
  id?: String,
  badge?: 'million-dollar' | 'veteran',
  size?: 'sm' | 'md' | 'lg',
}

const UserBadge = ({
  badge = 'million-dollar',
  size = 'md',
}: UserBadgeProps) => {
  const image = require(`./badges/_${badge}.svg`)

  return (
    <div className={`pb_user_badge_kit_${size}`}>
      <div className="pb__user_badge_wrapper">
        <img src={image} />
      </div>
    </div>
  )
}
export default UserBadge
