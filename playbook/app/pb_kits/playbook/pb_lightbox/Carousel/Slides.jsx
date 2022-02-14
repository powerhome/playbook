/* @flow */

import { noop } from 'lodash'
// import { motion } from 'framer-motion'
import React, { useState } from 'react'

import Slide from './Slide'
import styles from './styles.scss'
// import useSlides from './useSlides'

type SlidesType = {
  urls: Array<string>,
  current: number,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
}

export default function Slides({
  urls = [],
  onClick = noop,
}: SlidesType) {
  const [zooming, setZooming] = useState(false)
  // const { controls, dragConstraints, handleDragEnd } = useSlides({
  //   current,
  //   pagesCount: urls.length,
  //   onChange,
  // })

  const handleZoom = (isZooming) => setZooming(isZooming)

  return (
    <div className={styles.Slides}>
      {urls.map((url, i) => (
        <Slide
            key={i}
            onClick={() => onClick(i)}
            onZoom={handleZoom}
            url={url}
            zooming={zooming}
        />
      ))}
    </div>
    // </motion.div>
  )
}
