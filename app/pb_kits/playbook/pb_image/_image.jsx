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
  url: String,
}

const Image = (props: ImageProps) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    url = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_image lazyload blur_up'), className, spacing(props))
  const dataProps = buildDataProps(data)

  return (
    <div>
      <img
          {...ariaProps}
          {...dataProps}
          alt={alt}
          className={classes}
          data-src={url}
          id={id}
          src={url}
      />
    </div>
  )
}

export default Image
