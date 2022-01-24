/* eslint-disable no-unused-vars */
/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props.js'
import { globalProps } from '../utilities/globalProps.js'
import Icon from '../pb_icon/_icon'

import Carousel from './Carousel/index.jsx'

type LightboxType = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
  photos: [],
  initialPhoto: string,
  onClose: Function,
  icon: string,
  iconSize: number,
}

const Lightbox = (props: LightboxType) => {
  const {
    aria = {},
    className,
    data = {},
    id = '',
    photos,
    initialPhoto,
    onClose,
    icon,
    iconSize,
  } = props
  const [activePhoto, setActivePhoto] = useState(initialPhoto)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_lightbox'),
    globalProps(props),
    className
  )
  const handleOnSlide = (index) => {
    setActivePhoto(photos[index])
  }
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
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
            onChange={handleOnSlide}
            photos={photos.map((photo) => ({
            url: photo,
            thumbnail: photo,
          }))}
        />
      </div>
    </div>
  )
}

export default Lightbox
