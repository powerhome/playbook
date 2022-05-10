/* @flow */

import { noop } from 'lodash'
import classnames from 'classnames'
import React from 'react'
import { useWindowSize } from '../hooks/useWindowSize'

import Thumbnail from './Thumbnail'

export const indexWithinBounds = (
  current: number,
  min: number,
  max: number
): number => {
  if (current < min) return 0
  if (current > max) return max
  return current
}

type ThumbnailsType = {
  current: number,
  onChange: () => null,
  urls: [],
}

export default function Thumbnails({
  current = 0,
  onChange = noop,
  urls = [],
}: ThumbnailsType) {
  const viewportSize = useWindowSize()
  const thumbnailWidth = viewportSize.width / 8
  const draggable = thumbnailWidth * urls.length > viewportSize.width
  const css = classnames('Thumbnails', { draggable })

  return (
    <div
        className={css}
    >
      {urls.map((url, i) => (
        <Thumbnail
            active={i === current}
            alt={i}
            key={i}
            onClick={() => onChange(i)}
            url={url}
        />
      ))}
    </div>
  )
}
