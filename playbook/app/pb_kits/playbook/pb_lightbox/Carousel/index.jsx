/* eslint-disable jsx-control-statements/jsx-use-if-tag */
/* @flow */

import { noop } from 'lodash'
import React, { useEffect, useState } from 'react'

import Slides from './Slides'
import Thumbnails from './Thumbnails'
import styles from './styles.scss'

type CarouselType = {
  initialPhoto: string,
  onClose: Function,
  icon: string,
  iconSize: number,
  current: number,
  photos: Array<string>,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
}

export default function Carousel({
  current = 0,
  photos,
  onClick = noop,
  onChange = noop,
}: CarouselType) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])

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
          urls={photos.map((photo) => photo.url)}
      />
      {photos.length > 1 ? (
        <Thumbnails
            current={currentIndex}
            onChange={handleChange}
            urls={photos.map((photo) => photo.thumbnail)}
        />
      ) : null}
    </div>
  )
}
