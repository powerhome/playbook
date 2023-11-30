import React, { Fragment, useMemo, useRef, useState, useEffect } from 'react'
import { useKbdControls } from './hooks/useKbdControls'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import LightboxHeader from './Header/_lightbox_header'
import { LightboxContext } from './_lightbox_context'

import Carousel from './Carousel/index'

type LightboxType = {
  aria?: {[key: string]: string},
  children: React.ReactNode[] | React.ReactNode | string,
  className?: string,
  currentPhotoIndex?: number,
  data?: {[key: string]: string | number},
  description?: string | any,
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
  photos: [],
  initialPhoto?: number,
  onChange?: (index: number)=> {},
  onClickRight?: () => void,
  onClose?: () => void,
  icon: string,
  navRight?: string,
  trigger?: string,
  title?: string | any,
}

const Lightbox = (props: LightboxType): React.ReactNode => {
  const {
    aria = {},
    children,
    className,
    currentPhotoIndex,
    data = {},
    description,
    htmlOptions = {},
    id = '',
    initialPhoto = 0,
    photos,
    onChange = ()=>{},
    onClose,
    onClickRight,
    icon = 'times',
    navRight,
    title,
  } = props

  const [activePhoto, setActivePhoto] = useState(initialPhoto)

  useEffect(() => {
    onChange(activePhoto)
  },[activePhoto])

  useEffect(() => {
    currentPhotoIndex !== undefined && currentPhotoIndex !== null && (
    setActivePhoto(currentPhotoIndex)
    )
  },[currentPhotoIndex])

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
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


  return (
    <Fragment>
      <LightboxContext.Provider value={api}>
        <div
            {...ariaProps}
            {...dataProps}
            {...htmlProps}
            className={classes}
            id={id}
            ref={lightboxRef}
        >
          <div className="carousel">
          <Lightbox.Header
              icon={icon}
              onClose={onClose}
              onClickRight={onClickRight}
              text={description}
              navRight={navRight}
              title={title}
          />
            {children}
            <Carousel
                setIndex={setActivePhoto}
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
