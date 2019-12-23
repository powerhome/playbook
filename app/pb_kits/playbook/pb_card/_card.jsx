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

  return (
    <div className={classnames(cardCss, className)}>
      <div className={bodyCSS}>
        {children}
      </div>
    </div>
  )
}

export default Card
