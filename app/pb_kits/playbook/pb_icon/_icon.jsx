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
  spin?: Boolean,
}

const flipMap = {
  'horizontal': 'fa-flip-horizontal',
  'vertical': 'fa-flip-vertical',
  'both': 'fa-flip-horizontal fa-flip-vertical',
}

const Icon = ({
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
}: IconProps) => {
  const classes = classnames(className, flipMap[flip], 'pb_icon_kit', 'far', {
    'fa-border': border,
    'fa-fw': fixedWidth,
    'fa-inverse': inverse,
    'fa-li': listItem,
    'fa-pulse': pulse,
    'fa-spin': spin,
    [`fa-${icon}`]: icon,
    [`fa-${size}`]: size,
    [`fa-pull-${pull}`]: pull,
    [`fa-rotate-${rotation}`]: rotation,
  })

  return (
    <i
        className={classes}
        id={id}
    />
  )
}

export default Icon
