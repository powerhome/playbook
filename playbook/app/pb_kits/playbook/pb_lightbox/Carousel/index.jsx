/* eslint-disable jsx-control-statements/jsx-use-if-tag */
/* @flow */

import { noop } from 'lodash'
import React, { useEffect } from 'react'

import Slides from './Slides'
import Thumbnails from './Thumbnails'

type CarouselType = {
  initialPhoto: string,
  onClose: Function,
  icon: string,
  iconSize: number,
  currentIndex: number,
  photos: Array<string>,
  onChange: (index: number) => void,
  onClick: (index: number) => void,
}

export default function Carousel({
  currentIndex,
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

  const handleChange = (index) => {
    onChange(index)
  }

  return (
    <div className="Lightbox">
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
