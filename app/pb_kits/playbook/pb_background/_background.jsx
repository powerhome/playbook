/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import { Image } from '../'

type BackgroundProps = {
  aria?: object,
  borderNone?: boolean,
  className?: string,
  backgroundColor?: "gradient" | "dark" | "light",
  data?: object,
  id?: string,
  tag?: string,
  imageUrl?: string,
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl",
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
    padding = "md",
  } = props

  const borderCSS = borderNone == true ? 'border_none' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background_kit'), className, borderCSS, globalProps(props, { padding }))
  const Tag = `${tag}`

  return (

    <div
        {...ariaProps}
        {...dataProps}
        id={id}
    >
      <If condition={imageUrl}>
        <Image
            alt={name}
            url={imageUrl}
            className={classes}
        >
          {children}
        </Image>
        <Else/>
          <div className={classes + `pb--color_bg_${backgroundColor}`}>
            {children}
          </div>
      </If>
    </div>

  )
}

export default Background
