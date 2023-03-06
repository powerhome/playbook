import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Flex  from "../pb_flex/_flex"
import Icon from '../pb_icon/_icon'
import Button from '../pb_button/_button'

type MapProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactNode,
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
      {
        zoomBtns ? (
          <Flex className="custom-nav-control" orientation='column'>
            <div className="custom-nav-control-zoom">
              <Button className='map-zoom-in-button'
                  onClick={zoomInClick}
              >
                    <Icon icon="plus"/>
              </Button>
              <Button className='map-zoom-out-button'
                 onClick={zoomOutClick}
              >
                    <Icon icon="minus"/>
              </Button>
            </div>
            {
              flyTo ? (
                <Button className='map-flyto-button'
                  onClick={flyToClick}
                >
                      <Icon icon="eye"/>
                </Button>
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
