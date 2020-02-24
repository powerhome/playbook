/* @flow */
import React from 'react'

type UserBadgeProps = {
  className?: String,
  id?: String,
  badge: React.ReactNode,
  size?: 'sm' | 'md' | 'lg',
}

const UserBadge = ({
  badge,
  size = 'md',
}: UserBadgeProps) => (
  <div className={`pb_user_badge_kit_${size}`}>
    <div className={`pb_user_badge_wrapper`}>
      { badge }
    </div>
  </div>
)

export default UserBadge
