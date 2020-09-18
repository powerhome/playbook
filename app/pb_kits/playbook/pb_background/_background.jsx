/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Image, Title } from '../'

type BackgroundProps = {
  aria?: object,
  borderNone?: boolean,
  className?: string,
  backgroundColor?: "gradient" | "dark" | "light",
  data?: object,
  id?: string,
  tag?: string,
  imageUrl?: string,
  padding?: string,
  children?: array<React.ReactNode> | React.ReactNode,
}

const Background = (props: BackgroundProps) => {
  const {
    alt = '',
    aria = {},
    backgroundColor,
    borderNone = false,
    children,
    className,
    data = {},
    id,
    imageUrl = '',
    tag = "div",
    padding = 'md',
  } = props

  const borderCSS = borderNone == true ? 'border_none' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background_kit'), `pb--color_bg_${backgroundColor}`, className, borderCSS, globalProps(props, { padding }))
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
