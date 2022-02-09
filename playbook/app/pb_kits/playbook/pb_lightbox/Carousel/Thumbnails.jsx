/* @flow */

import { noop } from 'lodash'
import classnames from 'classnames'
import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useWindowSize } from '../hooks/useWindowSize'

import Thumbnail from './Thumbnail'

import styles from './styles.scss'

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
  const controls = useAnimation()
  const viewportSize = useWindowSize()
  const thumbnailWidth = viewportSize.width / 8
  const draggable = thumbnailWidth * urls.length > viewportSize.width
  const css = classnames(styles.Thumbnails, {
    [styles.draggable]: draggable,
  })
  const dragConstraints = {
    left: -1 * (thumbnailWidth * urls.length - viewportSize.width),
    right: 0,
  }

  const modifyTarget = (target) => {
    const nextIndex = Math.round(Math.abs(target) / thumbnailWidth)
    const snapTargetIndex = indexWithinBounds(nextIndex, 0, urls.length)
    const snapTarget = snapTargetIndex * thumbnailWidth
    const direction = Math.sign(target)
    return direction * snapTarget
  }

  useEffect(() => {
    if (draggable) {
      const x = Math.max(-current * thumbnailWidth, dragConstraints.left)
      controls.start({ x })
    }
  }, [controls, current, draggable, dragConstraints.left, thumbnailWidth])

  return (
    <motion.div
        animate={controls}
        className={css}
        drag={draggable && 'x'}
        dragConstraints={dragConstraints}
        dragElastic={0.05}
        dragTransition={{ modifyTarget }}
        transition={{ type: 'spring', bounce: 0 }}
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
    </motion.div>
  )
}
