import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type MapProps = {
  aria?: { [key: string]: string },
  children?: any,
  className?: string,
  data?: { [key: string]: string },
  id?: string,
}

const Map = (props: MapProps) => {
  const {
    aria = {},
    children,
  className,
  data = {},
  id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_map'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {children}
    </div>
  )
}

export default Map
