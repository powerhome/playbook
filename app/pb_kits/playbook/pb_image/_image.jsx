/* @flow */

import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type ImageProps = {
  url: string,
  alt?: string,
}

const Image = (props: ImageProps) => {
  const { alt = '', url = '' } = props
  return (
    <img
        alt={alt}
        className={classnames('pb_image_kit lazyload blur_up', globalProps(props))}
        data-src={url}
    />
  )
}

export default Image
