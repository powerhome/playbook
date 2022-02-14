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
  transition: "blur" | "fade" | "scale",
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
    transition = 'fade',
    url = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_image_kit', size ? `size_${size}` : null),
    'lazyload',
    transition,
    { rounded },
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)

  return (
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
        transition={transition}
    />
  )
}

export default Image
