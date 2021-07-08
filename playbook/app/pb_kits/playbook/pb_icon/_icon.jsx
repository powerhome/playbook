/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type IconProps = {
  aria?: object,
  border?: boolean,
  className?: string,
  customIcon?: SVGElement,
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
    customIcon,
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

  const faClasses = {
    'fa-border': border,
    'fa-fw': fixedWidth,
    'fa-inverse': inverse,
    'fa-li': listItem,
    'fa-pulse': pulse,
    'fa-spin': spin,
    [`fa-${size}`]: size,
    [`fa-pull-${pull}`]: pull,
    [`fa-rotate-${rotation}`]: rotation,
  }

  // Lets check and see if the icon prop is referring to a custom Power icon...
  // If so, then set fa-icon to "custom"
  // this ensures the JS will not do any further operations
  faClasses[`fa-${icon}`] = customIcon ? 'custom' : icon

  const classes = classnames(
    flipMap[flip],
    'pb_icon_kit',
    'far',
    faClasses,
    globalProps(props),
    className
  )

  aria.label ? null : aria.label = `${icon} icon`
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  // Add a conditional here to show only the SVG if custom
  return (
    <>
      <If condition={customIcon}>
        {
          React.cloneElement(customIcon, {
            ...dataProps,
            className: classes,
            id,
          })
        }
        <Else />
        <i
            {...dataProps}
            className={classes}
            id={id}
        />
        <span
            {...ariaProps}
            hidden
        />
      </If>
    </>
  )
}

export default Icon
