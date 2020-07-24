/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type ImageProps = {
<<<<<<< HEAD
  url: string,
  alt?: string,
}

const Image = (props: ImageProps) => {
  const { alt = '', url = '' } = props
  return (
    <img
        alt={alt}
        className={classnames('pb_image_kit lazyload blur_up', spacing(props))}
        data-src={url}
    />
=======
  alt?: String,
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
  lazy?: Boolean,
  url: String,
}

const Image = (props: ImageProps) => {
  const {
    alt = '',
    aria = {},
    className,
    data = {},
    id,
    lazy = false,
    url = '',
  } = props

  const lazyStyle = lazy === true ? 'lazyload' : ''

  const ariaProps = buildAriaProps(aria)
  const classes = classnames(buildCss('pb_image blur_up'), lazyStyle, className, spacing(props))
  const dataProps = buildDataProps(data)

  return (
<<<<<<< HEAD
    <If condition={lazy}>
      <img
          {...ariaProps}
          {...dataProps}
          alt={alt}
          className={classes}
          data-src={url}
          id={id}
      />
      <Else />
      <img
          {...ariaProps}
          {...dataProps}
          alt={alt}
          className={classes}
          id={id}
          src={url}
      />
    </If>
>>>>>>> Add props to image
=======
    <>
      <If condition={lazy}>
        <img
            {...ariaProps}
            {...dataProps}
            alt={alt}
            className={classes}
            data-src={url}
            id={id}
        />
        <Else />
        <img
            {...ariaProps}
            {...dataProps}
            alt={alt}
            className={classes}
            id={id}
            src={url}
        />
      </If>
    </>
>>>>>>> Add fragment to jsx files
  )
}

export default Image
