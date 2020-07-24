/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type ImageProps = {
  alt?: String,
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
  lazy?: Boolean,
  url: String,
}

const Image = (props: ImageProps) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    lazy = false,
    url = '',
  } = props

  const lazyStyle = lazy === true ? 'lazyload' : ''

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_image blur_up'), lazyStyle, className, spacing(props))
  const dataProps = buildDataProps(data)

  return (
    <div>
      <If condition={lazy}>
        <img
            {...ariaProps}
            {...dataProps}
            alt={alt}
            className={classes}
            data-src={url}
            id={id}
        />
        <Else />
        <img
            {...ariaProps}
            {...dataProps}
            alt={alt}
            className={classes}
            id={id}
            src={url}
        />
      </If>
    </div>
  )
}

export default Image
