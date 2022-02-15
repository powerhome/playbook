/* @flow */

import React from 'react'
import { noop } from 'lodash'
import classnames from 'classnames'
import Image from '../../pb_image/_image'

type ThumbnailType = {
  active?: boolean,
  alt?: string,
  onClick: () => void,
  url: string,
  width?: string,
}

export default function Thumbnail({
  active = false,
  alt,
  width,
  url,
  onClick = noop,
}: ThumbnailType) {
  const activeClasses = classnames('Thumbnail', { active })
  return (
    <button
        className={classnames(activeClasses)}
        onClick={onClick}
        style={{ width }}
        type="button"
    >
      <Image
          alt={alt}
          size="sm"
          url={url}
      />
    </button>
  )
}
