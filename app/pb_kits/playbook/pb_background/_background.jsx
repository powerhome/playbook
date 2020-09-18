/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Image, Title } from '../'

type BackgroundProps = {
  aria?: object,
  className?: string,
  backgroundColor?: "gradient" | "dark" | "light",
  data?: object,
  id?: string,
  tag?: string,
  imageUrl?: string,
  children?: array<React.ReactNode> | React.ReactNode,
}

const Background = (props: BackgroundProps) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    imageUrl = '',
    tag = "div",
    children,
    backgroundColor,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background'), `pb--color_bg_${backgroundColor}`, className, globalProps(props))
  const Tag = `${tag}`

  return (

    <div
        {...ariaProps}
        {...dataProps}
        alt={alt}
        className={classes}
        data-src={imageUrl}
        id={id}
    >
      {children}
      {/* <Image url={imageUrl}></Image>` */}
    </div>

  )
}

export default Background
