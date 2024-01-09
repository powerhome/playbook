import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import MapControls from './_map_controls';

type MapProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
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
  className,
  data = {},
  htmlOptions = {},
  id,
  zoomBtns = false,
  flyTo = false,
  zoomInClick,
  zoomOutClick,
  flyToClick
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)

  const classes = classnames(buildCss('pb_map'), globalProps(props), className)

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {
        zoomBtns ? (
          <Map.Controls
              flyTo={flyTo}
              flyToClick={flyToClick}
              zoomBtns={zoomBtns}
              zoomInClick={zoomInClick}
              zoomOutClick={zoomOutClick}
          />
         ) : null
      }
      {children}
    </div>
  )
}

Map.Controls = MapControls
export default Map
