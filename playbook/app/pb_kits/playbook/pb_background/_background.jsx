/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
// import { style } from './style.css'

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
    tag = 'div',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(buildCss('pb_background_kit'), globalProps(props), `pb_background_color_${backgroundColor}`, className)
  const Tag = `${tag}`
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
  }

  return (
    <>
      <If condition={imageUrl}>
        <Tag
            style={backgroundStyle}
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
        >
          { children }
        </Tag>
        <Else />
        <Tag
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
        >
          { children }
        </Tag>
      </If>
    </>
  )
}

export default Background
