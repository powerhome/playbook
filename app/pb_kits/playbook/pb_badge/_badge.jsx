/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

type BadgeProps = {
  className?: String,
  dark?: Boolean,
  id?: String,
  text?: String,
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral',
  rounded?: Boolean
}
const Badge = ({
  className,
  dark = false,
  id,
  text,
  variant = 'neutral',
  rounded = false
}: BadgeProps) => {
  const roundedClass = rounded === true ? "rounded" : ""
  const darkClass = dark === true ? "dark" : ""
  const css = classnames([
    `pb_badge_kit_${variant}_${roundedClass}_${darkClass}`,
    className,
  ])

  return (
    <div
        className={css}
        id={id}
    >
      <span>{text}</span>
    </div>
  )
}

export default Badge
