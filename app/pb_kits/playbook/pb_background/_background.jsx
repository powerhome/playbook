/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Image } from '../'

type BackgroundProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  tag?: string,
  color?: "bg_gradient" | "bg_dark" | "bg_light",
  image_url?: string,
  children?: array<React.ReactNode> | React.ReactNode,
}

const Background = (props: BackgroundProps) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    image_url = '',
    tag = "div",
    children,
    color
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background'), className, globalProps(props))
  const Tag = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        alt={alt}
        className={classes + ' ' + `pb--color_${color}`}
        data-src={image_url}
        id={id}
        src={image_url}
    >
      {children}
    </Tag>
  )
}

export default Background
