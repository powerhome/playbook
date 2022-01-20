/* eslint-disable no-unused-vars */
/* @flow */

import React, { useState } from 'react'
import { Icon } from '../../'

import Carousel from '../Carousel/index.jsx'

type LightboxType = {
  photos: [],
  initialPhoto: string,
  onClose: Function,
  icon: string,
  iconSize: number,
}

export default function Lightbox({
  photos,
  initialPhoto,
  onClose,
  icon,
  iconSize,
}: LightboxType) {
  const [activePhoto, setActivePhoto] = useState(initialPhoto)

  const handleOnSlide = (index) => {
    setActivePhoto(photos[index])
  }

  return (
    <div className="carousel">
      <div className="carousel-header">
        <div
            className="close-icon"
            onClick={onClose}
        >
          <Icon
              icon={icon}
              size={iconSize}
          />
        </div>
        <div className="active-photo-overlay" />
      </div>
      <Carousel
          current={photos.indexOf(initialPhoto)}
          images={photos.map((photo) => ({
          url: photo,
          thumbnail: photo,
        }))}
          onChange={handleOnSlide}
      />
    </div>
  )
}
