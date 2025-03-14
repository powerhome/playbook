import { noop } from '../../utilities/object'
import classnames from 'classnames'
import React, { useLayoutEffect } from 'react'
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
  onChange: (index: number) => void,
  urls: string[],
}

export default function Thumbnails({
  current = 0,
  onChange = noop,
  urls = [],
}: ThumbnailsType): React.ReactElement {
  const viewportSize = useWindowSize()
  const thumbnailWidth = viewportSize.width / 8
  const shouldBeCentered = (thumbnailWidth * urls.length) < (viewportSize.width * 0.9)
  const css = classnames('Thumbnails', { centered: shouldBeCentered })
  const otherProps: { buttonRef?: React.RefObject<HTMLButtonElement> } = {}

  const thumbnailsRef: React.RefObject<HTMLDivElement>  = React.createRef()

  useLayoutEffect(() => {
    if (shouldBeCentered) return

    const currentThumbnail = otherProps.buttonRef.current

    const thumbWidth = currentThumbnail.clientWidth,
    scrollLeft = thumbWidth * current,
    firstThumb: HTMLButtonElement = thumbnailsRef.current.querySelector('.Thumbnail:first-child'),
    lastThumb: HTMLButtonElement = thumbnailsRef.current.querySelector('.Thumbnail:last-child')

    firstThumb.style.marginLeft = `${(thumbnailsRef.current?.clientWidth / 2) - (thumbWidth / 2)}px`
    lastThumb.style.marginRight = `${(thumbnailsRef.current?.clientWidth / 2) - (thumbWidth / 2)}px`
    thumbnailsRef.current?.scrollTo(scrollLeft, 0)
  })

  return (
    <div
        className={css}
        ref={thumbnailsRef}
    >
      {urls.map((url, i) => {
        const active = i === current
        if (active) otherProps.buttonRef = React.createRef()
        return (
          <Thumbnail
              active={active}
              alt={i.toString()}
              key={i}
              onClick={() => onChange(i)}
              url={url}
              {...otherProps}
          />
        )
      })}
    </div>
  )
}
