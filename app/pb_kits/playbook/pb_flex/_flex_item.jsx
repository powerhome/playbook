/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
type FlexItemPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  fixedSize: String,
  grow: Boolean,
  className: String,
}

const FlexItem = (props: FlexItemPropTypes) => {
  const { children, className, fixedSize, grow } = props
  const growClass = grow === true ? 'grow' : ''
  const fixedStyle =
    fixedSize !== undefined ? { flexBasis: `${fixedSize}` } : null

  return (
    <div
        className={classnames(buildCss('pb_flex_item_kit', growClass), className, globalProps(props))}
        style={fixedStyle}
    >
      {children}
    </div>
  )
}

export default FlexItem
