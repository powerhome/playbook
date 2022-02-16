/* eslint-disable no-unused-vars */
/* @flow */

import React, { useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props.js'
import { globalProps } from '../utilities/globalProps.js'
import Icon from '../pb_icon/_icon'
import LightboxHeader from './_lightbox_header'
import { LightboxContext } from './_lightbox_context'

import Carousel from './Carousel/index.jsx'

type LightboxType = {
  aria?: object,
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  data?: object,
  description?: string,
  id?: string,
  photos: [],
  initialPhoto: string,
  onClose: Function,
  opened: boolean,
  icon: string,
  iconSize: number,
  trigger?: string,
}

const Lightbox = (props: LightboxType) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    description,
    id = '',
    photos,
    initialPhoto,
    onClose,
    opened,
    icon,
    iconSize,
    trigger,
  } = props
  const [activePhoto, setActivePhoto] = useState(initialPhoto)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_lightbox_kit'),
    globalProps(props),
    className
  )

  const handleOnSlide = (index) => {
    setActivePhoto(photos[index])
  }

  const api = {
    onClose: trigger
      ? function () {
        setTriggerOpened(false)
      }
      : onClose,
  }

  const [triggerOpened, setTriggerOpened] = useState(false),
    modalIsOpened = trigger ? triggerOpened : opened

  if (trigger) {
    const modalTrigger = document.querySelector(trigger)
    modalTrigger.addEventListener(
      'click',
      () => {
        setTriggerOpened(true)
        document
          .querySelector('#cancel-button')
          .addEventListener('click', () => {
            setTriggerOpened(false)
          })
      },
      { once: true }
    )
  }
  return (
    <LightboxContext.Provider value={api}>
      <div
          {...ariaProps}
          {...dataProps}
          className={classes}
          id={id}
      >
        <div className="carousel">
          {children}
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
    </LightboxContext.Provider>
  )
}

Lightbox.Header = LightboxHeader

export default Lightbox
