import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Flex  from "../pb_flex/_flex"
import SectionSeparator from '../pb_section_separator/_section_separator'
import Icon from '../pb_icon/_icon'

type MapProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  zoomBtns?: boolean,
  flyTo?: boolean,
  zoomInId?: string,
  zoomOutId?: string,
  flyToId?: string,
} & GlobalProps

const Map = (props: MapProps) => {
  const {
  aria = {},
  children,
  className,
  data = {},
  id,
  zoomBtns = false,
  flyTo = false,
  zoomInId,
  zoomOutId,
  flyToId,
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
      {
        zoomBtns ? (
          <Flex className="custom-nav-control" orientation='column'>
            <div className="custom-nav-control-zoom">
              <div className='map-zoom-in-button'
                  id={zoomInId ? zoomInId : "zoominid"}>
                    <Icon icon="plus"/>
              </div>
              <SectionSeparator />
              <div className='map-zoom-out-button'
                  id={zoomOutId ? zoomOutId : "zoomoutbutton"}>
                    <Icon icon="minus"/>
              </div>
            </div>
          {
            flyTo ? (
              <div className='map-flyto-button'
                  id={flyToId ? flyToId : "flytobutton"}>
                    <Icon icon="eye"/>
              </div>
            ) : null
          }
         
         </Flex>
         ) : null
      }
      {children}
    </div>
  )
}

export default Map
