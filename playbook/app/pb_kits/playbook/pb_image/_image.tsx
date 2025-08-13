import React from 'react'
import classnames from 'classnames'
import { GlobalProps, globalProps, globalInlineProps } from '../utilities/globalProps'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

type ImageType = {
  alt?: string,
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  onError?: () => void,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  rounded?: boolean,
  transition?: "blur" | "fade" | "scale",
  url?: string,
} & GlobalProps

const Image = (props: ImageType): React.ReactElement => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    htmlOptions = {},
    id,
    onError = null,
    rounded = false,
    size = '',
    transition = 'fade',
    url = '',
  } = props

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(
    buildCss('pb_image_kit', size ? `size_${size}` : null),
    transition,
    { rounded },
    globalProps(props),
    className
  )
  const dynamicInlineProps = globalInlineProps(props)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)


  return (
    <img
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        alt={alt}
        className={classes}
        data-src={url}
        id={id}
        onError={onError}
        src={url}
        style={dynamicInlineProps}
    />
  )
}

export default Image
