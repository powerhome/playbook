/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
type FlexProps = {
  children: array<React.ReactNode> | React.ReactNode,
  className?: string,
  horizontal?: "left" | "center" | "right" | "stretch",
  id?: string,
  inline?: Boolean,
  orientation?: "row" | "column",
  spacing?: "around" | "between" | "evenly" | "none",
  reverse?: Boolean,
  vertical?: "top" | "center" | "bottom" | "stretch",
  wrap?: Boolean,
}

const Flex = (props: FlexProps) => {
  const {
    children,
    className,
    inline = false,
    horizontal = 'left',
    orientation = 'row',
    spacing = 'none',
    reverse = false,
    vertical = 'top',
    wrap = false,
  } = props
  const orientationClass =
    orientation !== undefined ? `orientation_${orientation}` : ''
  const horizontalClass =
    horizontal !== undefined ? `justify_content_${horizontal}` : ''
  const verticalClass = vertical !== undefined ? `align_items_${vertical}` : ''
  const inlineClass = inline === true ? 'inline' : ''
  const spacingClass = spacing !== undefined ? `spacing_${spacing}` : ''
  const wrapClass = wrap === true ? 'wrap' : ''
  const reverseClass = reverse === true ? 'reverse' : ''
  return (
    <div
        className={classnames(
        buildCss(
          'pb_flex_kit',
          orientationClass,
          horizontalClass,
          verticalClass,
          inlineClass,
          spacingClass,
          reverseClass,
          wrapClass
        ),
        className,
        globalProps(props)
      )}
    >
      {children}
    </div>
  )
}

export default Flex
