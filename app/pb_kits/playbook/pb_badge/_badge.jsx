/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

type BadgeProps = {
  className?: String,
  id?: String,
  text?: String,
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral',
  rounded?: Boolean
}
const Badge = ({
  className,
  id,
  text,
  variant = 'neutral',
  rounded = false
}: BadgeProps) => {
  const roundedValue = rounded == true ? "rounded" : ""
  const css = classnames([
    `pb_badge_kit_${variant}_${roundedValue}`,
    className,
  ])

  return (
    <div id={id} className={css}>
        <span>{text}</span>
    </div>
  )
}

export default Badge
