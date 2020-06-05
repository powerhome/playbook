/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type BadgeProps = {
  className?: String,
  dark?: Boolean,
  id?: String,
  text?: String,
  variant?: "success" | "warning" | "error" | "info" | "neutral",
  rounded?: Boolean,
}
const Badge = (props: BadgeProps) => {
  const {
    className,
    dark = false,
    id,
    text,
    variant = 'neutral',
    rounded = false,
  } = props
  const css = classnames(
    className,
    buildCss('pb_badge_kit', variant, {
      rounded: rounded,
      dark: dark,
    }),
    spacing(props)
  )

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
