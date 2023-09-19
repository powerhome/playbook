import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
type FlexItemPropTypes = {
  children: React.ReactNode[] | React.ReactNode,
  fixedSize?: string,
  grow?: boolean,
  shrink?: boolean,
  className?: string,
  order?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'first' | 'none',
  alignSelf?: "start" | "end" | "center" | "stretch" | null,
  displayFlex?: boolean
} & GlobalProps

const FlexItem = (props: FlexItemPropTypes): React.ReactElement => {
  const {
    children,
    className,
    fixedSize,
    grow,
    shrink,
    flex = 'none',
    order = 'none',
    alignSelf,
    displayFlex
  } = props
  const growClass = grow === true ? 'grow' : ''
  const displayFlexClass = displayFlex === true ? `display_flex_${displayFlex}` : ''
  const flexClass = flex !== 'none' ? `flex_${flex}` : ''
  const shrinkClass = shrink === true ? 'shrink' : ''
  const alignSelfClass = alignSelf ? `align_self_${alignSelf}` : ''
  const fixedStyle =
    fixedSize !== undefined ? { flexBasis: `${fixedSize}` } : null
  const orderClass = order !== 'none' ? `order_${order}` : null

  return (
    <div
        className={classnames(buildCss('pb_flex_item_kit', growClass, shrinkClass, flexClass, displayFlexClass), orderClass, alignSelfClass, globalProps(props), className)}
        style={fixedStyle}
    >
      {children}
    </div>
  )
}

export default FlexItem
