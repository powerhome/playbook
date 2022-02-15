/* @flow */

import { noop } from 'lodash'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import Slide from './Slide'
import useSlides from './useSlides'

type SlidesType = {
  urls: Array<string>,
  current: number,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
}

export default function Slides({
  urls = [],
  current = 0,
  onClick = noop,
  onChange = noop,
}: SlidesType) {
  const [zooming, setZooming] = useState(false)
  const { controls, dragConstraints, handleDragEnd } = useSlides({
    current,
    pagesCount: urls.length,
    onChange,
  })

  const handleZoom = (isZooming) => setZooming(isZooming)

  return (
    <motion.div
        animate={controls}
        className="Slides"
        drag={!zooming && 'x'}
        dragConstraints={dragConstraints}
        dragElastic={0.05}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', bounce: 0 }}
    >
      {urls.map((url, i) => (
        <Slide
            key={i}
            onClick={() => onClick(i)}
            onZoom={handleZoom}
            url={url}
            zooming={zooming}
        />
      ))}
    </motion.div>
  )
}
