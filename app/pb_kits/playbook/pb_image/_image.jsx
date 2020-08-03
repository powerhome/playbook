/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

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
    <img
        alt={alt}
        className={classnames('pb_image_kit lazyload blur_up', globalProps(props))}
        data-src={url}
    />
  )
}

export default Image
