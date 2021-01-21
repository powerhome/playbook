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
  hideOnError?: boolean,
  id?: string,
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
    hideOnError = false,
    id,
    rounded = false,
    size = '',
    url = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_image_kit lazyload blur_up', size),
    { rounded },
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)
  const handleOnError = hideOnError ? (e) => e.target.style.display = 'none' : null

  return (
    <div>
      <img
          {...ariaProps}
          {...dataProps}
          alt={alt}
          className={classes}
          data-src={url}
          id={id}
          onError={handleOnError}
          rounded={rounded}
          src={url}
      />
    </div>
  )
}

export default Image
