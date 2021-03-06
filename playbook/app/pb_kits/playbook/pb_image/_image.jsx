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
  onError?: () => {},
  size: "xs" | "sm" | "md" | "lg" | "xl",
  rounded?: boolean,
  url: string,
}

const Image = (props: ImageProps) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    onError = null,
    rounded = false,
    size = '',
    url = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_image_kit', size),
    'lazyload',
    'blur_up',
    { rounded },
    globalProps(props),
    className
  )
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
          onError={onError}
          rounded={+rounded}
          src={url}
      />
    </div>
  )
}

export default Image
