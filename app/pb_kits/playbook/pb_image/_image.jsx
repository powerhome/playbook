/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type ImageProps = {
  alt?: string,
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  url: string,
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
  const classes = classnames(buildCss('pb_image lazyload blur_up'), className, globalProps(props))
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
