/* @flow */
import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type UserBadgeProps = {
  className?: String,
  id?: String,
  badge?: "million-dollar" | "veteran",
  size?: "sm" | "md" | "lg",
}

const UserBadge = (props: UserBadgeProps) => {
  const { badge = 'million-dollar', size = 'md' } = props
  const image = require(`./badges/_${badge}.svg`)

  return (
    <div className={classnames(`pb_user_badge_kit_${size}`, spacing(props))}>
      <div className="pb_user_badge_wrapper">
        <img src={image} />
      </div>
    </div>
  )
}
export default UserBadge
