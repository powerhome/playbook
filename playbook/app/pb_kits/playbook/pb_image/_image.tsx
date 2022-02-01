import React from 'react'
import classnames from 'classnames'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type ImageType = {
  alt?: string,
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string},
  id?: string,
  onError?: () => void,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  rounded?: boolean,
  transition?: "blur" | "fade" | "scale",
  url?: string,
} & GlobalProps

const Image = (props: ImageType) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    onError = null,
    rounded = false,
    size = '',
    transition = 'fade',
    url = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_image_kit', size),
    'lazyload',
    transition,
    { rounded },
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)

  return (
    <img
        {...ariaProps}
        {...dataProps}
        alt={alt}
        className={classes}
        data-src={url}
        id={id}
        onError={onError}
        src={url}
    />
  )
}

export default Image
