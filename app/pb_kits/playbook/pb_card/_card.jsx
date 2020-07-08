/* @flow */

import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type CardPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  highlight?: {
    position?: "side" | "top",
    color?: String,
  },
  selected?: Boolean,
  shadow?: "none" | "deep" | "deeper" | "deepest",
  dark?: Boolean,
  borderNone?: Boolean,
}

type CardHeaderProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  categoryColor?: Number,
}

type CardBodyProps = {
  children: Array<React.ReactNode> | React.ReactNode | String,
  className?: String,
}

// Header component
const Header = (props: CardHeaderProps) => {
  const { children, className, categoryColor = 1 } = props
  const headerCSS = buildCss('pb_card_header_kit', `category_${categoryColor}`)

  const headerSpacing = spacing(props) ? spacing(props) : 'p_sm'
  return (
    <div className={classnames(headerCSS, className, headerSpacing)}>
      {children}
    </div>
  )
}

// Body component
const Body = (props: CardBodyProps) => {
  const { children, className } = props
  const bodyCSS = buildCss('pb_card_body_kit')
  const bodySpacing = spacing(props) ? spacing(props) : 'p_md'
  return (
    <div className={classnames(bodyCSS, className, bodySpacing)}>
      {children}
    </div>
  )
}

const Card = (props: CardPropTypes) => {
  const {
    children,
    className,
    dark = false,
    highlight = {},
    selected = false,
    shadow = 'none',
    borderNone = false,
  } = props
  const bodyCSS = buildCss('pb_card_body_kit')
  const borderCSS = borderNone == true ? 'border_none' : ''
  const cardCss = buildCss('pb_card_kit', `shadow_${shadow}`, `${borderCSS}`, {
    dark: dark,
    selected,
    deselected: !selected,
    [`highlight_${highlight.position}`]: highlight.position,
    [`highlight_${highlight.color}`]: highlight.color,
  })
  const cardSpacing = spacing(props) ? spacing(props) : 'p_md'

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
    <div className={classnames(cardCss, className)}>
      {subComponentTags('Header')}
      <div className={classnames(bodyCSS, cardSpacing)}>
        {nonHeaderChildren}
      </div>
    </div>
  )
}

Card.Header = Header
Card.Body = Body

export default Card
