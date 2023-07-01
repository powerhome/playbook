import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import MapControls from './_map_controls';

type MapProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactNode,
  customButton?:any,
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  zoomBtns?: boolean,
  flyTo?: boolean, 
  zoomInClick?: () => {},
  zoomOutClick?: () => {},
  flyToClick?: () => {},
} & GlobalProps

const Map = (props: MapProps) => {
  const {
  aria = {},
  children,
  customButton,
  className,
  data = {},
  id,
  zoomBtns = false,
  flyTo = false,
  zoomInClick,
  zoomOutClick,
  flyToClick
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
      <Map.Controls
      customButton={customButton}
      flyTo={flyTo}
      flyToClick={flyToClick}
      zoomBtns={zoomBtns}
      zoomInClick={zoomInClick}
      zoomOutClick={zoomOutClick}
      >
       {customButton}
      </Map.Controls>
      {children}
    </div>
  )
}

Map.Controls = MapControls
export default Map
