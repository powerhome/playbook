/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type IconProps = {
  aria?: object,
  border?: boolean,
  className?: string,
  color?: string,
  custom?: boolean,
  data?: object,
  fixedWidth?: boolean,
  flip?: "horizontal" | "vertical" | "both" | "none",
  icon: string,
  id?: string,
  inverse?: boolean,
  listItem?: boolean,
  pull?: "left" | "right" | "none",
  pulse?: boolean,
  rotation?: 90 | 180 | 270,
  size?: | "lg"
    | "xs"
    | "sm"
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x"
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x",
  spin?: boolean,
}

const flipMap = {
  horizontal: 'fa-flip-horizontal',
  vertical: 'fa-flip-vertical',
  both: 'fa-flip-horizontal fa-flip-vertical',
}

const Icon = (props: IconProps) => {
  const {
    aria = {},
    border = false,
    className,
    color,
    data = {},
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

  const customIconList = ['powergon', 'greensky', 'nitro']

  const classes = classnames(
    flipMap[flip],
    'pb_icon_kit',
    `${customIconList.includes(icon) ? 'fak' : 'far'}`,
    {
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
    },
    globalProps(props),
    className
  )

  aria.label ? null : aria.label = `${icon} icon`
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  return (
    <>
      <i
          style={{ 'color': `${color}` }}
          {...dataProps}
          className={classes}
          id={id}
      />
      <span
          {...ariaProps}
          hidden
      />
    </>
  )
}

export default Icon
