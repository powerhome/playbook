/* @flow */

import React from 'react'
import { noop } from 'lodash'
import classnames from 'classnames'
import { Image } from '../../'

import styles from './styles.scss'

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
  return (
    <button
        className={classnames(styles.Thumbnail, { [styles.active]: active })}
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
