/* @flow */

import React from 'react'
import { get } from 'lodash'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type CardPropTypes = {
  aria?: object,
  background?: "white" | "dark" | "light" | "windows" | "siding" | "doors" | "solar" | "roofing" | "gutters" | "insulation",
  borderNone?: boolean,
  borderRadius?: "xs" | "sm" | "md" | "lg" | "xl" | "none" | "rounded",
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  data?: object,
  highlight?: {
    position?: "side" | "top",
    color?: string,
  },
  padding?: string,
  selected?: boolean,
  shadow?: "none" | "deep" | "deeper" | "deepest",
  tag?: "div" | "section" | "footer" | "header" | "article" | "aside" | "main" | "nav",
}

type CardHeaderProps = {
  headerColor?: string,
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
  const { children, className, headerColor = 'category_1', padding = 'sm' } = props
  const headerCSS = buildCss('pb_card_header_kit', `${headerColor}`)

  const headerSpacing = globalProps(props, { padding })

  return (
    <div className={classnames(headerCSS, headerSpacing, className)}>
      {children}
    </div>
  )
}

// Body component
const Body = (props: CardBodyProps) => {
  const { children, padding = 'md', className } = props
  const bodyCSS = buildCss('pb_card_body_kit')
  const bodySpacing = globalProps(props, { padding })

  return (
    <div className={classnames(bodyCSS, bodySpacing, className)}>
      {children}
    </div>
  )
}

const Card = (props: CardPropTypes) => {
  const {
    aria = {},
    background,
    borderNone = false,
    borderRadius = 'md',
    children,
    className,
    data = {},
    highlight = {},
    selected = false,
    shadow = 'none',
    tag = 'div',
    padding = 'md',
  } = props
  const borderCSS = borderNone == true ? 'border_none' : ''
  const cardCss = buildCss('pb_card_kit', `shadow_${shadow}`, `${borderCSS}`, `border_radius_${borderRadius}`, {
    selected,
    deselected: !selected,
    [`background_${background}`]: background,
    [`highlight_${highlight.position}`]: highlight.position,
    [`highlight_${highlight.color}`]: highlight.color,
  })
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

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

  const tagOptions = ['div', 'section', 'footer', 'header', 'article', 'aside', 'main', 'nav']
  const Tag = tagOptions.includes(tag) ? tag : 'div'

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        className={classnames(cardCss, globalProps(props, { padding }), className)}
    >
      {subComponentTags('Header')}
      {nonHeaderChildren}
    </Tag>
  )
}

Card.Header = Header
Card.Body = Body

export default Card
