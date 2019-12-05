/* @flow */

import React from 'react'
import classnames from 'classnames'

type IconProps = {
  aria?: Object,
  border?: Boolean,
  className?: String,
  fixedWidth?: Boolean,
  flip?: 'horizontal' | 'vertical' | 'both' | 'none',
  icon: String,
  id?: String,
  inverse?: Boolean,
  listItem?: Boolean,
  pull?: 'left' | 'right' | 'none',
  pulse?: Boolean,
  rotation?: 90 | 180 | 270,
  size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x',
  spin?: Boolean
}

const Icon = (props: IconProps) => {
  const {
    border = false,
    className,
    fixedWidth = true,
    flip = false,
    icon,
    id,
    inverse = false,
    listItem = false,
    pull,
    pulse = false,
    rotation,
    size,
    spin = false,
  } = props

  const hClass = 'fa-flip-horizontal'
  const vClass = 'fa-flip-vertical'

  const flipClass = (function(flip) {
    switch (flip) {
    case 'horizontal':
      return hClass
    case 'vertical':
      return vClass
    case 'both':
      return `${vClass} ${hClass}`
    default:
      return ''
    }
  })(flip)

  const iconClass = icon !== '' && icon !== undefined ? `fa-${icon}` : ''
  const borderClass = border ? 'fa-border' : ''
  const fixedWidthClass = fixedWidth ? 'fa-fw' : ''
  const inverseClass = inverse ? 'fa-inverse' : ''
  const listItemClass = listItem ? 'fa-li' : ''
  const pullClass = pull !== '' && pull !== undefined ? `fa-pull-${pull}` : ''
  const pulseClass = pulse ? 'fa-pulse' : ''
  const rotationClass = rotation !== '' && rotation !== undefined ? `fa-rotate-${rotation}` : ''
  const sizeClass = size !== '' && size !== undefined ? `fa-${size}` : ''
  const spinClass = spin ? 'fa-spin' : ''

  const iconCss = classnames(
    'pb_icon_kit',
    'far',
    iconClass,
    borderClass,
    fixedWidthClass,
    flipClass,
    inverseClass,
    listItemClass,
    pullClass,
    pulseClass,
    rotationClass,
    sizeClass,
    spinClass,
    className
  )

  return (
    <i
        className={iconCss}
        id={id}
    />
  )
}

export default Icon
