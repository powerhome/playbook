/* @flow */

import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CardPropTypes = {
  borderNone?: Boolean,
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  highlight?: {
    position?: "side" | "top",
    color?: string,
  },
  padding?: string,
  selected?: Boolean,
  shadow?: "none" | "deep" | "deeper" | "deepest",
}

type CardHeaderProps = {
  categoryColor?: number,
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  padding?: string,
}

type CardBodyProps = {
  children: array<React.ReactNode> | React.ReactNode | string,
  className?: string,
  padding?: string,
}

// Header component
const Header = (props: CardHeaderProps) => {
  const { children, className, categoryColor = 1, padding = 'sm' } = props
  const headerCSS = buildCss('pb_card_header_kit', `category_${categoryColor}`)

  const headerSpacing = globalProps(props, { padding })

  return (
    <div className={classnames(headerCSS, className, headerSpacing)}>
      {children}
    </div>
  )
}

// Body component
const Body = (props: CardBodyProps) => {
  const { children, className, padding = 'md' } = props
  const bodyCSS = buildCss('pb_card_body_kit')

  const bodySpacing = globalProps(props, { padding })

  return (
    <div className={classnames(bodyCSS, className, bodySpacing)}>
      {children}
    </div>
  )
}

const Card = (props: CardPropTypes) => {
  const {
    borderNone = false,
    children,
    className,
    highlight = {},
    selected = false,
    shadow = 'none',
    padding = 'md',
  } = props
  const bodyCSS = buildCss('pb_card_body_kit')
  const borderCSS = borderNone == true ? 'border_none' : ''
  const cardCss = buildCss('pb_card_kit', `shadow_${shadow}`, `${borderCSS}`, {
    selected,
    deselected: !selected,
    [`highlight_${highlight.position}`]: highlight.position,
    [`highlight_${highlight.color}`]: highlight.color,
  })

  // coerce to array
  const cardChildren =
    typeof children === 'object' && children.length ? children : [children]

  const subComponentTags = (tagName) => {
    return cardChildren.filter((c) => (
      get(c, 'type.displayName') === tagName
    )).map((child, i) => {
      return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` })
    })
  }

  const nonHeaderChildren = cardChildren.filter((child) => (get(child, 'type.displayName') !== 'Header'))

  return (
    <div className={classnames(cardCss, globalProps(props), className)}>
      {subComponentTags('Header')}
      <div className={classnames(bodyCSS, globalProps({ padding }))}>
        {nonHeaderChildren}
      </div>
    </div>
  )
}

Card.Header = Header
Card.Body = Body

export default Card
