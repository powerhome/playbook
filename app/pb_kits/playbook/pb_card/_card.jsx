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
}

const Header = () => null

const Card = ({
  children,
  className,
  highlight = {},
  padding = 'md',
  selected = false,
  shadow = 'none',
}: CardPropTypes) => {
  const bodyCSS = buildCss('pb_card_body_kit', padding)
  const cardCss = buildCss('pb_card_kit', `shadow_${shadow}`, {
    selected,
    deselected: !selected,
    [`highlight_${highlight.position}`]: highlight.position,
    [`highlight_${highlight.color}`]: highlight.color,
  })

  const renderHeader = () => {
    const content = React.Children.map((children, child) => {
      if (child.type.displayName === 'Header' || child.type.name === 'Header') {
        return React.cloneElement(child)
      }
    })
    return (
      <div className="collapsible-card-top-content">
        {content.length > 0 ? content[0].props.children : '' }
      </div>
    )
  }

  return (
    <div className={classnames(cardCss, className)}>
      {renderHeader()}
      <div className={bodyCSS}>
        {children}
      </div>
    </div>
  )
}

Card.Header = Header
export default Card
