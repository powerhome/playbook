/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type BadgeProps = {
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  id?: String,
  rounded?: Boolean,
  text?: String,
  variant?: "error" | "info" | "neutral" | "primary" | "success" | "warning",
}
const Badge = (props: BadgeProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    id,
    rounded = false,
    text,
    variant = 'neutral',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    className,
    buildCss('pb_badge_kit', variant, {
      rounded: rounded,
    }),
    globalProps(props)
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <span>{text}</span>
    </div>
  )
}

export default Badge
