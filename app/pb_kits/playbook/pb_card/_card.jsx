/* @flow */

import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

type CardPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  highlight?: {
    position?: 'side' | 'top',
    color?: String
  },
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  selected?: Boolean,
  shadow?: 'none' | 'deep' | 'deeper' | 'deepest',
  dark?: Boolean,
}

type CardHeaderProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  categoryColor?: Number,
}

type CardBodyProps = {
  children: Array<React.ReactNode> | React.ReactNode | String,
  className?: String,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

// Header component
const Header = ({
  children,
  className,
  padding = 'sm',
  categoryColor = 1,
}: CardHeaderProps) => {
  const headerCSS = buildCss('pb_card_header_kit', padding, `category_${categoryColor}`)
  return (
    <div className={classnames(headerCSS, className)}>
      {children}
    </div>
  )
}

// Body component
const Body = ({
  children,
  className,
  padding = 'sm',
}: CardBodyProps) => {
  const bodyCSS = buildCss('pb_card_body_kit', padding)
  return (
    <div className={classnames(bodyCSS, className)}>
      {children}
    </div>
  )
}

const Card = ({
  children,
  className,
  dark = false,
  highlight = {},
  padding = 'md',
  selected = false,
  shadow = 'none',
}: CardPropTypes) => {
  const bodyCSS = buildCss('pb_card_body_kit', padding)
  const cardCss = buildCss('pb_card_kit', `shadow_${shadow}`, {
    'dark': dark,
    selected,
    deselected: !selected,
    [`highlight_${highlight.position}`]: highlight.position,
    [`highlight_${highlight.color}`]: highlight.color,
  })

  // coerce to array
  const cardChildren = typeof(children) === 'object' && children.length ? children : [children]

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
      <div className={bodyCSS}>
        {nonHeaderChildren}
      </div>
    </div>
  )
}

Card.Header = Header
Card.Body = Body

export default Card
