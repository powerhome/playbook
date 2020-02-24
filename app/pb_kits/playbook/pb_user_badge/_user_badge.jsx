import React from 'react'

type UserBadgeProps = {
  className?: String,
  id?: String,
  badge?: 'million-dollar' | 'veteran' ,
  size?: 'sm' | 'md' | 'lg',
}

const UserBadge = ({
  badge = 'million-dollar',
  size = 'md',
}: UserBadgeProps) => (
  <div className={`pb_user_badge_kit__${size}`}>
    
  </div>
)

export default UserBadge
