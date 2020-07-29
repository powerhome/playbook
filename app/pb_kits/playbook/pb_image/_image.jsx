/* @flow */

import React from 'react'
import classnames from 'classnames'
import { systemProps } from '../utilities/systemProps.js'

type ImageProps = {
  url: string,
  alt?: string,
}

const Image = (props: ImageProps) => {
  const { alt = '', url = '' } = props
  return (
    <img
        alt={alt}
        className={classnames('pb_image_kit lazyload blur_up', systemProps(props))}
        data-src={url}
    />
  )
}

export default Image
