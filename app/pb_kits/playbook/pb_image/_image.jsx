/* @flow */

import React from 'react'

type ImageProps = {
  url: string,
  alt?: string,
}

const Image = ({
  alt = '',
  url = '',
}: ImageProps) => (
  <img
      alt={alt}
      className="pb_image lazyload blur_up"
      data-src={url}
  />
)

export default Image
