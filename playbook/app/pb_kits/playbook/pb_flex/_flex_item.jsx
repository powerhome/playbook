/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
type FlexItemPropTypes = {
  children: array<React.ReactNode> | React.ReactNode,
  fixedSize: string,
  grow: boolean,
  shrink: boolean,
  flex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none',
  className: string,
  overflow?: "auto" | "hidden" | "initial" | "inherit" | "scroll" | "visible",
  order?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'first' | 'none',
}

const FlexItem = (props: FlexItemPropTypes) => {
  const { children, className, fixedSize, grow, overflow = null, shrink, flex = 'none', order = 'none' } = props
  const growClass = grow === true ? 'grow' : ''
  const flexClass = flex !== 'none' ? `flex_${flex}` : ''
  const overflowClass = overflow ? `overflow_${overflow}` : ''
  const shrinkClass = shrink === true ? 'shrink' : ''
  const fixedStyle =
    fixedSize !== undefined ? { flexBasis: `${fixedSize}` } : null
  const orderClass = order !== 'none' ? `order_${order}` : null



  return (
    <div
        className={classnames(buildCss('pb_flex_item_kit', growClass, shrinkClass, flexClass), overflowClass, orderClass, globalProps(props), className)}
        style={fixedStyle}
    >
      {children}
    </div>
  )
}

export default FlexItem
