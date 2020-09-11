/* @flow */

import classnames from 'classnames'
import { get } from 'lodash'
import { Flex, FlexItem } from '../'
import React, { useState } from 'react'
import AnimateHeight from 'react-animate-height'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CollapsibleProps = {
  children: React.ChildrenArray<React.Element<typeof Main | Content>>,
  aria?: object,
  className?: string,
  data?: object,
  id?: string,
}

type CollapsibleMainProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  padding?: string,
}

type CollapsibleContentProps = {
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  padding?: string,
}

const Main = (props: CollapsibleMainProps) => {
  const { children, className, padding = 'sm' } = props
  const mainCSS = buildCss('pb_collapsible_main_kit')
  const mainSpacing = globalProps(props, { padding })

  return (
    <div className={classnames(mainCSS, className, mainSpacing)}>
      {children}
    </div>
  )
}

const Content = (props: CollapsibleContentProps) => {
  const { children, className, padding = 'md' } = props
  const contentCSS = buildCss('pb_collapsible_content_kit')
  const contentSpacing = globalProps(props, { padding })

  return (
    <div className={classnames(contentCSS, className, contentSpacing)}>
      {children}
    </div>
  )
}

const Collapsible = (props: CollapsibleProps) => {
  const {
    aria = {},
    className,
    children = [],
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_collapsible'), className, globalProps(props))

  const [height, setHeight] = useState(0)
  const toggleExpand = () => {
    setHeight(height === 0 ? 'auto' : 0)
  }

  const collapsibleChildren =
    typeof children === 'object' && children.length ? children : [children]

  const subComponentTags = (tagName) => {
    return collapsibleChildren.filter((c) => (
      get(c, 'type.name') === tagName
    )).map((child, i) => {
      return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` })
    })
  }

  const renderChevron = (height) => {
    const direction = height === 0 ? 'down' : 'up'

    return (
      <div
          key={direction}
          style={{ verticalAlign: 'middle' }}
      >
        <i  className={`far fa-2x fa-chevron-${direction} fa-fw`} />
      </div>
    )
  }

  const renderMain = () => {
    const mainTags = subComponentTags('Main')

    return (
      <div onClick={toggleExpand}>
        <Flex
            spacing="between"
            vertical="center"
        >
          <FlexItem>{mainTags}</FlexItem>
          <FlexItem>{renderChevron(height)}</FlexItem>
        </Flex>
      </div>

    )
  }

  const renderContent = () => {
    const nonMainChildren = collapsibleChildren.filter((child) => (get(child, 'type.name') !== 'Main'))
    return (
      <AnimateHeight
          duration={500}
          height={height}
          id="bottom-section"
      >
        {nonMainChildren}
      </AnimateHeight>
    )
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {renderMain()}
      {renderContent()}
    </div>
  )
}
Collapsible.Main = Main
Collapsible.Content = Content

export default Collapsible
