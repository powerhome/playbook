/* @flow */

import React from 'react'

import classnames from 'classnames'

import { Icon } from '../'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type IconCircleProps = {
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  icon: string,
  id?: string,
  size?: "base" | "xs" | "sm" | "md" | "lg" | "xl",
  variant?: | "default"
    | "royal"
    | "blue"
    | "purple"
    | "teal"
    | "red"
    | "yellow"
    | "green",
}

const IconCircle = (props: IconCircleProps) => {
  const { aria = {}, className, dark = false, data = {}, icon, id, size = 'md', variant = 'default' } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_icon_circle_kit', size, variant), className, globalProps(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Icon
          dark={dark}
          icon={icon}
      />
    </div>
  )
}

export default IconCircle
