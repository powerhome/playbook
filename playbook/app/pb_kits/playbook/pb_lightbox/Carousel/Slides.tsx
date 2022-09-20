/* @flow */

import { noop } from 'lodash'
import React, { useState } from 'react'

import Slide from './Slide'

type SlidesType = {
  urls: Array<string>,
  current: number,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
  setIndex?: (index: number)=> void,


}

export default function Slides({
  urls = [],
  current = 0,
  onChange = noop,
  setIndex,

}: SlidesType): React.ReactElement {
  const [zooming, setZooming] = useState(false)

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

const minSwipeDistance = 40 
const onTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null)
  setTouchStart(e.targetTouches[0].clientX)
}

const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)

const onTouchEnd = () => {
  if (!touchStart || !touchEnd) return
  const distance = touchStart - touchEnd
  const isLeftSwipe = distance > minSwipeDistance
  const isRightSwipe = distance < -minSwipeDistance
  if (isLeftSwipe) {
    setIndex(current < urls.length - 1 ? current + 1 : urls.length - 1)
  } else if (isRightSwipe) {
    setIndex(current > 0 ? current - 1 : 0)
  }
}



  const handleZoom = (isZooming: boolean) => setZooming(isZooming)
  return (
    <div
        className="Slides"
        onTouchStart={onTouchStart} 
        onTouchMove={onTouchMove} 
        onTouchEnd={onTouchEnd}
    >
      <Slide
          onClick={() => onChange(current)}
          onZoom={handleZoom}
          url={urls[current]}
          zooming={zooming}
      />
    </div>
  )
}
