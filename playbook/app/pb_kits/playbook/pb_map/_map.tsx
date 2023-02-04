import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import Flex  from "../pb_flex/_flex"
import SectionSeparator from '../pb_section_separator/_section_separator'
import Icon from '../pb_icon/_icon'


type MapProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  zoomBtns?: boolean
  flyTo?: boolean
}

const Map = (props: MapProps) => {
  const {
  aria = {},
  children,
  className,
  data = {},
  id,
  zoomBtns = false,
  flyTo = false
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
                id="zoom-in-button">
                  <Icon icon="plus"/>
            </div>
            <SectionSeparator />
            <div className='map-zoom-out-button'
                id="zoom-out-button">
                  <Icon icon="minus"/>
            </div>
          </div>
          {
            flyTo ? (
          <div className='map-flyto-button'
                  id="flyto-button">
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
