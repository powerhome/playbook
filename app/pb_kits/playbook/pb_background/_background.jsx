/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type BackgroundProps = {
  aria?: object,
  backgroundColor?: 'gradient' | 'dark' | 'light' | 'white',
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  data?: object,
  id?: string,
  imageUrl?: string,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
}

const Background = (props: BackgroundProps) => {
  const {
    aria = {},
    backgroundColor = 'light',
    children,
    className,
    data = {},
    id,
    imageUrl = '',
    padding = 'md',
    tag = 'div',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_background_kit'), className, globalProps(props, { padding }))
  const Tag = `${tag}`
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
  }

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        id={id}
    >
      <If condition={imageUrl}>
        <div
            className={classes + 'lazyload blur_up'}
            style={backgroundStyle}
        >
          { children }
        </div>
        <Else />
        <div className={classes + `bg_${backgroundColor}`}>
          { children }
        </div>
      </If>
    </Tag>
  )
}

export default Background
