/* @flow */
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
}) => (
  <div className={`pb_user_badge_kit_${size}`}>
    <If condition={UserBadgeProps.badge == "veteran"}>
      <Image source={require('./badges/_veteran.svg')} />
    </If>
  </div>
)

export default UserBadge
