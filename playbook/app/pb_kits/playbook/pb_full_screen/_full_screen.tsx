import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import useFullscreen from './useFullScreen'

import Flex from '../pb_flex/_flex'
import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'
import Body from '../pb_body/_body'


type FullScreenViewProps = {
  aria?: { [key: string]: string },
  children: React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void) },
  id?: string,
  contentPadding?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"
  headerText?: string
  headerTextStyling?: "title_4" | "body"
  onOpen?: () => void
  onClose?: () => void
  stickyHeader?: boolean
  trigger?: (props: { onClick: () => void; isOpen: boolean }) => React.ReactNode
  escToExit?: boolean

}

const FullScreenView = (props: FullScreenViewProps) => {
  const {
  aria = {},
  children,
  className,
  contentPadding = "lg",
  data = {},
  htmlOptions = {},
  id,
  headerText,
  headerTextStyling = "title_4",
  onOpen,
  onClose,
  stickyHeader = true,
  trigger,
  escToExit = true,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_full_screen_kit'), globalProps(props), className)
  const headerClasses = classnames("fullscreen-header", {
    "fullscreen-header-sticky": stickyHeader,
  })
  const contentClasses = classnames("fullscreen-content", `p_${contentPadding}`)

  const { isFullscreen, toggle } = useFullscreen({
    escToExit,
    onEnter: onOpen,
    onExit: onClose,
  })

  const defaultHeader = (
    <div className={headerClasses}>
      <Flex
          align="center"
          justify="between"
          paddingLeft="sm"
          paddingRight="xxs"
          paddingY="xs"
      >
        {headerText && (
          headerTextStyling === "title_4" ? (
          <Title
              size={4}
              text={headerText}
          />
          ) : (
            <Body text={headerText} />
          )
        )}
        <button
            className="fullscreen-close-button"
            onClick={toggle}
        >
          <Icon
              color="link"
              fixedWidth
              icon="close"
              padding="xxs"
              size="1x"
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
          {defaultHeader}
          <div className={contentClasses}>
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
