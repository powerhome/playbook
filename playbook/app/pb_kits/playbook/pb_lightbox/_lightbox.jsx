
/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type LightboxProps = {
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
}

const Lightbox = (props: LightboxProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_lightbox'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {className}
    </div>
  )
}

export default Lightbox
