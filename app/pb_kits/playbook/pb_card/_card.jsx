/* @flow */

import React from 'react'
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
  shadow?: 'none' | 'shallow' | 'default' | 'deep' | 'deeper' | 'deepest',
  dark?: Boolean,
}

type CardHeaderProps = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  color?: 'category_1' | 'category_2' | 'category_3' | 'category_4' | 'category_5' | 'category_6' | 'category_7' | 'category_8' |
          'category_9' | 'category_10' | 'category_11' | 'category_12' | 'category_13' | 'category_14' | 'category_15' | 'category_16' |
          'category_17' | 'category_18' | 'category_19' | 'category_20' | 'category_21',
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
  color = 'category_14',
}: CardHeaderProps) => {
  const headerCSS = buildCss('pb_card_header_kit', padding, color)
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
    return cardChildren.filter((c) => {
      return c.type && c.type.displayName === tagName
    }).map((child, i) => {
      return React.cloneElement(child, { key: `${tagName.toLowerCase()}-${i}` })
    })
  }

  const nonHeaderChildren = cardChildren.filter((child) => !child.type || child.type.displayName !== 'Header')

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
