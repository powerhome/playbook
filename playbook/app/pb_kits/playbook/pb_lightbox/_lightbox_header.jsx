/* @flow */
import React, { useContext } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import { LightboxContext } from './_lightbox_context'
import { LightboxHeaderIcon } from './_lightbox_header_icon'
import Caption from '../pb_caption/_caption'
import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'
import Title from '../pb_title/_title'

type LightboxHeaderProps = {
  aria?: object,
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  closeable: boolean,
  data?: object,
  icon?: string,
  iconSize?: string,
  id?: string,
  padding?: string,
  spacing?: string,
  text?: string,
  title?: string,
}

const LightboxHeader = (props: LightboxHeaderProps) => {
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
  const api = useContext(LightboxContext)
  const headerCSS = buildCss('lightbox_header')
  const headerSpacing = globalProps(props, { padding })

  /* eslint-disable react/jsx-handler-names */

  return (
    <div className="carousel-header">
      <Flex
          {...ariaProps}
          {...dataProps}
          className={classnames(headerCSS, headerSpacing, className)}
          spacing={spacing}
      >
        <If condition={closeable}>
          <FlexItem flex={1}>
            <LightboxHeaderIcon
                className="close-icon"
                icon={icon}
                iconSize={iconSize}
                onClose={api.onClose}
            />
          </FlexItem>
          <If condition={title && text}>
            <FlexItem flex={5}>
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
          </If>
          <FlexItem flex={1}>
            <Flex justify="end">
              <Title
                  dark
                  size={4}
                  text="All Photos"
              />
            </Flex>
          </FlexItem>
        </If>
        {children}
      </Flex>
    </div>
  )
}

export default LightboxHeader
