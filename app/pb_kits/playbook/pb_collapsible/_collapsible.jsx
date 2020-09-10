/* @flow */

import classnames from 'classnames'
import { get } from 'lodash'
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
    children = null,
    data = {},
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_collapsible'), className, globalProps(props))

  const collapsibleChildren =
    typeof children === 'object' && children.length ? children : [children]

  const subComponentTags = (tagName) => {
    return collapsibleChildren.filter((c) => (
      get(c, 'type.displayName') === tagName
    )).map((child, i) => {
      return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` })
    })
  }

  const nonMainChildren = collapsibleChildren.filter((child) => (get(child, 'type.displayName') !== 'Main'))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {subComponentTags('Main')}
      {nonMainChildren}
    </div>
  )
}
Collapsible.Main = Main
Collapsible.Content = Content

export default Collapsible
