import React, { Fragment, useMemo, useRef, useState } from 'react'
import { useKbdControls } from './hooks/useKbdControls'
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
  icon: string,
  iconSize: IconSizes,
  showCount?: boolean,
  textRight?: string,
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
    icon = 'times',
    iconSize = '2x',
    showCount = true,
    textRight = 'All Photos',
    title,
  } = props
  const [activePhoto, setActivePhoto] = useState(initialPhoto)
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
    setActivePhoto(activePhoto < photos.length - 1 ? activePhoto + 1 : photos.length - 1)
  } else if (isRightSwipe) {
    setActivePhoto(activePhoto > 0 ? activePhoto - 1 : 0)
  }
}

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
    onClose: onClose,
    onArrowLeft: () => {
      setActivePhoto(activePhoto > 0 ? activePhoto - 1 : 0)
    },
    onArrowRight: () => {
      const nextPhoto = activePhoto < photos.length - 1 ? activePhoto + 1 : photos.length - 1
      setActivePhoto(nextPhoto)
    },
  }
  useKbdControls(api)

  const lightboxRef: any = useRef()

  const headerTextRight = showCount ? `${activePhoto + 1} / ${photos.length}` : textRight

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
              textRight={headerTextRight}
              title={title}
          />
            {children}
            <div
            onTouchStart={onTouchStart} 
            onTouchMove={onTouchMove} 
            onTouchEnd={onTouchEnd}
            >
            <Carousel
                currentIndex={activePhoto}
                onChange={handleOnSlide}
                photos={photosMap}
            />
            </div>
          </div>
        </div>
      </LightboxContext.Provider>
    </Fragment>
  )
}

Lightbox.Header = LightboxHeader

export default Lightbox
