/* @flow */

import React from 'react'

type CardPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  selected?: Boolean,
  shadow?: 'none' | 'shallow' | 'default' | 'deep' | 'deeper' | 'deepest',
}

const cardCSS = ({
  selected=false,
  shadow='none',
}: CardPropTypes) => {
  let css = ''
  css += selected ? '_selected' : '_deselected'
  css += `_shadow_${shadow}`
  return css
}

const bodyCSS = ({padding='md'}: CardPropTypes) => {
  let css = ''
  css += `_${padding}`
  return css
}

const Card = (props: CardPropTypes) => {
  const {children} = props

  return (
    <div className={`pb_card_kit${cardCSS(props)}`}>
      <div className={`pb_card_body_kit${bodyCSS(props)}`}>
        { children }
      </div>
    </div>
  )
}

export default Card
