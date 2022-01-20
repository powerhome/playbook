/* eslint-disable jsx-control-statements/jsx-use-if-tag */
/* @flow */

import { noop } from 'lodash'
import React, { useState } from 'react'

import Slides from './Slides'
import Thumbnails from './Thumbnails'
import useUnscrollableBody from './useUnscrollableBody'

import styles from './styles.scss'

type CarouselType = {
  initialPhoto: string,
  onClose: Function,
  icon: string,
  iconSize: number,
  current: number,
  images: Array<string>,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
}

export default function Carousel({
  current = 0,
  images,
  onClick = noop,
  onChange = noop,
}: CarouselType) {
  useUnscrollableBody()
  const [currentIndex, setCurrentIndex] = useState(current)
  const handleChange = (index) => {
    setCurrentIndex(index)
    onChange(index)
  }

  return (
    <div className={styles.Lightbox}>
      <Slides
          current={currentIndex}
          onChange={handleChange}
          onClick={onClick}
          urls={images.map((image) => image.url)}
      />
      {images.length > 1 ? (
        <Thumbnails
            current={currentIndex}
            onChange={handleChange}
            urls={images.map((image) => image.thumbnail)}
        />
      ) : null}
    </div>
  )
}
