/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type BackgroundProps = {
  alt?: string,
  aria?: object,
  backgroundColor?: 'gradient' | 'dark' | 'light' | 'white' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary' | 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5' | 'category_6' | 'category_7' | 'category_8' | 'category_9' | 'category_10' | 'category_11' | 'category_12' | 'category_13' | 'category_14' | 'category_15' | 'category_16' | 'category_17' | 'category_18' | 'category_19' | 'category_20' | 'category_21',
  backgroundSize?: 'auto' | 'cover' | 'contain',
  children?: array<React.ReactNode> | React.ReactNode,
  className?: string,
  data?: object,
  id?: string,
  imageUrl?: string,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  transition?: 'fade' | 'blur' | 'scale',
}

const Background = (props: BackgroundProps) => {
  const {
    alt = '',
    aria = {},
    backgroundColor = 'light',
    backgroundSize = 'cover',
    children,
    className,
    data = {},
    id,
    imageUrl = '',
    tag = 'div',
    transition = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${backgroundSize}`,
  }

  const classes = classnames(buildCss('pb_background_kit'), 'lazyload', backgroundStyle, transition, globalProps(props), `pb_background_color_${backgroundColor}`, className)
  const Tag = `${tag}`

  return (
    <>
      <If condition={imageUrl}>
        <Tag
            alt={alt}
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
