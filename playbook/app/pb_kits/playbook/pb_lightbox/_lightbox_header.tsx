/* eslint-disable react/no-multi-comp */
/* @flow */
import React, { useContext } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import { LightboxContext } from './_lightbox_context'
import { LightboxHeaderIcon } from './_lightbox_header_icon'
import { IconSizes } from '../pb_icon/_icon'

import Caption from '../pb_caption/_caption'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'
import Title from '../pb_title/_title'

type LightboxHeaderProps = {
  aria?: {[key: string]: string},
  children?: React.ReactNode[] | React.ReactNode | string,
  className?: string,
  closeable?: boolean,
  data?: {[key: string]: string | number},
  icon?: string,
  iconSize?: IconSizes,
  id?: string,
  text?: string,
  title?: string,
} & GlobalProps

const LightboxHeader = (props: LightboxHeaderProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    padding = 'sm',
    spacing = 'between',
    text,
    title,
    closeable = true,
    icon = 'times',
    iconSize = '2x',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const api: any = useContext(LightboxContext)
  const headerCSS = buildCss('lightbox_header')
  const headerSpacing = globalProps(props, { padding })

  const handleOnLightboxClose = () => api.onClose()

  const HeaderBody = () => (
    <React.Fragment>
      <FlexItem flex="1">
        <LightboxHeaderIcon
            icon={icon}
            iconSize={iconSize}
            onClose={handleOnLightboxClose}
        />
      </FlexItem>
      {(title && text) && (
        <FlexItem flex="5">
          <Flex justify="center">
            <Flex
                align="center"
                orientation="column"
            >
              <Title
                  dark
                  paddingBottom="xs"
                  size={4}
                  text={title}
              />
              <Caption dark>{text}</Caption>
            </Flex>
          </Flex>
        </FlexItem>
      ) }
      <FlexItem flex="1">
        <Flex justify="end">
          <Title
              dark
              size={4}
              text="All Photos"
          />
        </Flex>
      </FlexItem>
    </React.Fragment>
  )

  return (
    <div className="carousel-header">
      <Flex
          {...ariaProps}
          {...dataProps}
          className={classnames(headerCSS, headerSpacing, className)}
          spacing={spacing}
      >
        {closeable && <HeaderBody/>}
        {children}
      </Flex>
    </div>
  )
}

export default LightboxHeader
