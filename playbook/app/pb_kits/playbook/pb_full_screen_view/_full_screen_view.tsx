
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import useFullscreen from './useFullScreen'

import Flex from '../pb_flex/_flex'
import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'


type FullScreenViewProps = {
  aria?: { [key: string]: string },
  children: React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void) },
  id?: string,
  title?: string
  onOpen?: () => void
  onClose?: () => void
  trigger?: (props: { onClick: () => void; isOpen: boolean }) => React.ReactNode
  escToExit?: boolean
  customHeader?: React.ReactNode

}

const FullScreenView = (props: FullScreenViewProps) => {
  const {
  aria = {},
  children,
  className,
  data = {},
  htmlOptions = {},
  id,
  title,
  onOpen,
  onClose,
  trigger,
  escToExit = true,
  customHeader,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_full_screen_view'), globalProps(props), className)

  const { isFullscreen, toggle } = useFullscreen({
    escToExit,
    onEnter: onOpen,
    onExit: onClose,
  })

  const defaultHeader = (
    <div className="fullscreen-header">
      <Flex justify="between">
        {title && (
          <Title
              size={4}
              text={title}
          />
        )}
        <button
            className="fullscreen-close-button"
            onClick={toggle}
        >
          <Icon
              fixedWidth
              icon="arrow-down-left-and-arrow-up-right-to-center"
          />
        </button>
      </Flex>
    </div>
  )

  const renderTrigger = () => {
    if (!trigger) return null
    return trigger({ onClick: toggle, isOpen: isFullscreen })
  }

  const renderContent = () => {
    if (isFullscreen) {
      return (
        <div className="fullscreen-overlay">
          {customHeader || defaultHeader}
          <div className="fullscreen-content">
            {children}
          </div>
        </div>
      )
    }
    return children
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {renderTrigger()}
      {renderContent()}
    </div>
  )
}

export default FullScreenView
