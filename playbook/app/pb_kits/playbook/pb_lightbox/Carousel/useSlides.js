// @flow

import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import { useWindowSize } from '../hooks/useWindowSize'

const cycleIndex = (current: number, min: number, max: number): number => {
  if (current < min) return max
  if (current > max) return min
  return current
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function useSlides({
  current = 0,
  pagesCount = 0,
  onChange = noop,
}) {
  const controls = useAnimation()
  const viewportSize = useWindowSize()
  const [currentIndex, setCurrentIndex] = useState(current)
  const dragConstraints = {
    left: -viewportSize.width * (pagesCount - 1),
    right: 0,
  }

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection
    const cycledNextIndex = cycleIndex(nextIndex, 0, pagesCount - 1)
    setCurrentIndex(cycledNextIndex)
    return cycledNextIndex
  }

  const handleDragEnd = (e, { offset, velocity }) => {
    let nextIndex = currentIndex
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      nextIndex = paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      nextIndex = paginate(-1)
    }

    controls.start({ x: -viewportSize.width * nextIndex })

    if (nextIndex !== currentIndex) {
      onChange(nextIndex)
    }
  }

  useEffect(() => {
    controls.set({ x: -viewportSize.width * current })
    setCurrentIndex(current)
  }, [controls, current, viewportSize.width])

  return {
    controls,
    dragConstraints,
    handleDragEnd,
  }
}
