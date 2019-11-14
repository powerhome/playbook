/* @flow */

import React from 'react'
import classnames from 'classnames'

type CardPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  className?: String,
  highlight?: {
    position?: String,
    color?: String
  },
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  selected?: Boolean,
  shadow?: 'none' | 'shallow' | 'default' | 'deep' | 'deeper' | 'deepest',
}

const cardCSS = ({
  highlight={},
  selected=false,
  shadow='none'
}: CardPropTypes) => {
  let css = 'pb_card_kit'
  css += highlight.position ? `_highlight_${highlight.position}` : null
  css += highlight.color ? `_highlight_${highlight.color}` : null
  css += selected ? '_selected' : '_deselected'
  css += `_shadow_${shadow}`
  return css
}

const bodyCSS = ({padding='md'}: CardPropTypes) => {
  let css = 'pb_card_body_kit'
  css += `_${padding}`
  return css
}

const Card = (props: CardPropTypes) => {
  const {
    children,
    className
  } = props

  return (
    <div className={classnames(cardCSS(props), className)}>
      <div className={bodyCSS(props)}>
        { children }
      </div>
    </div>
  )
}

export default Card
