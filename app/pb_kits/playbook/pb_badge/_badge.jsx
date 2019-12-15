/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

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
  rounded = false,
}: BadgeProps) => {
  const css = classnames(className, buildCss('pb_badge_kit', variant, {
    'rounded': rounded,
    'dark': dark,
  }))

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
