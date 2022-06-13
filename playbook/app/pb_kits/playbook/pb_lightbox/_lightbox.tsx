/* eslint-disable no-unused-vars */
/* @flow */

import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import LightboxHeader from './_lightbox_header'
import { LightboxContext } from './_lightbox_context'
import { IconSizes } from '../pb_icon/_icon'

import Carousel from './Carousel/index'

type LightboxType = {
  aria?: {[key: string]: string},
  children: React.ReactNode[] | React.ReactNode | string,
  className?: string,
  data?: {[key: string]: string | number},
  description?: string,
  id?: string,
  photos: [],
  initialPhoto?: number,
  onClose: () => void,
  opened: boolean,
  icon: string,
  iconSize: IconSizes,
  trigger?: string,
  title?: string,
}

const Lightbox = (props: LightboxType): React.ReactNode => {
  const {
    aria = {},
    children,
    className,
    data = {},
    description,
    id = '',
    initialPhoto = 0,
    photos,
    onClose,
    // opened = false,
    icon = 'times',
    iconSize = '2x',
    trigger,
    title,
  } = props
  const [activePhoto, setActivePhoto] = useState(initialPhoto)
  // const [triggerOpened, setTriggerOpened] = useState(false)

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_lightbox_kit'),
    globalProps(props),
    className
  )

  const handleOnSlide = (photoIndex: number) => {
    setActivePhoto(photoIndex)
  }

  const photosMap = useMemo(() => photos.map((photo) => ({
    url: photo,
    thumbnail: photo,
  })), [photos])

  const api = {
    onClose: trigger
      ? function () {
        // setTriggerOpened(false)
      }
      : onClose,
    onArrowLeft: () => {
      setActivePhoto(activePhoto > 0 ? activePhoto - 1 : 0)
    },
    onArrowRight: () => {
      const nextPhoto = activePhoto < photos.length - 1 ? activePhoto + 1 : photos.length - 1
      setActivePhoto(nextPhoto)
    },
  }

  const lightboxRef: any = useRef()

  if (trigger && lightboxRef) {
    const modalTrigger = lightboxRef.querySelector(trigger)
    modalTrigger.addEventListener(
      'click',
      () => {
        // setTriggerOpened(true)
        lightboxRef
          .querySelector('#cancel-button')
          .addEventListener('click', () => {
            // setTriggerOpened(false)
          })
      },
      { once: true }
    )
  }

  const handleKeyDown = ({key}: {key: string}) => {
    switch(key.toLowerCase()) {
      case 'escape': {
        api.onClose()
        break;
      }
      case 'arrowleft': {
        api.onArrowLeft()
        break;
      }
      case 'arrowright': {
        api.onArrowRight()
        break;
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePhoto])

  return (
    <Fragment>
      <LightboxContext.Provider value={api}>
        <div
            {...ariaProps}
            {...dataProps}
            className={classes}
            id={id}
            ref={lightboxRef}
        >
          <div className="carousel">
          <Lightbox.Header
              icon={icon}
              iconSize={iconSize}
              text={description}
              title={title}
          />
            {children}
            <Carousel
                currentIndex={activePhoto}
                onChange={handleOnSlide}
                photos={photosMap}
            />
          </div>
        </div>
      </LightboxContext.Provider>
    </Fragment>
  )
}

Lightbox.Header = LightboxHeader

export default Lightbox
