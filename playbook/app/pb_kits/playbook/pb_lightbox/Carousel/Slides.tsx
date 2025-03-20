import { noop } from '../../utilities/object'
import React, { useState } from 'react'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'

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

const arrowLeft = () => setIndex(current > 0 ? current - 1 : 0)
const arrowRight = () => setIndex(current < urls.length - 1 ? current + 1 : urls.length - 1)


  const handleZoom = (isZooming: boolean) => setZooming(isZooming)
  return (
    <div
        className="Slides"
        onTouchEnd={onTouchEnd} 
        onTouchMove={onTouchMove} 
        onTouchStart={onTouchStart}
    >
      {
        urls.length > 1 && (
        <CircleIconButton
            className='carousel-arrow-left'
            dark
            icon="chevron-left"
            onClick={arrowLeft}
            variant="link"
        />
      )
     }
      <Slide
          onClick={() => onChange(current)}
          onZoom={handleZoom}
          url={urls[current]}
          zooming={zooming}
      />
      {
        urls.length > 1 && (
        <CircleIconButton
            className='carousel-arrow-right'
            dark
            icon="chevron-right"
            onClick={arrowRight}
            variant="link"
        />
        )
      }

    </div>
  )
}
