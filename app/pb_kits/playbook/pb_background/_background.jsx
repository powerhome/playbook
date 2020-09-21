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
  backgroundColor?: "bg_gradient" | "bg_dark" | "bg_light" | "white",
  data?: object,
  id?: string,
  tag?: string,
  text?: string,
  imageUrl?: string,
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl",
  children?: array<React.ReactNode> | React.ReactNode,
}

const Background = (props: BackgroundProps) => {
  const {
    aria = {},
    backgroundColor = 'bg_light',
    borderNone = false,
    children,
    className,
    data = {},
    id,
    imageUrl = '',
    tag = 'div',
    text = '',
    padding = 'md',
  } = props

  const borderCSS = borderNone == true ? 'border_none' : ''
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background_kit'), className, borderCSS, text, globalProps(props, { padding }))
  const Tag = `${tag}`

  return (

    <Tag
        {...ariaProps}
        {...dataProps}
        id={id}
    >
      <If condition={imageUrl}>
        <div className="container">
          <Image
              alt={name}
              className={classes}
              url={imageUrl}
          />
          <div className="content">
            { text || children }
          </div>
        </div>
        <Else />
        <div className={classes + backgroundColor}>
          { text || children }
        </div>
      </If>
    </Tag>

  )
}

export default Background
