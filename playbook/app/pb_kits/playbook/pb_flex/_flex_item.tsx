import React from 'react'
import classnames from 'classnames'
import { buildCss, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps, globalInlineProps} from '../utilities/globalProps'
type FlexItemPropTypes = {
  children: React.ReactNode[] | React.ReactNode,
  fixedSize?: string,
  grow?: boolean,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  shrink?: boolean,
  className?: string,
  flex?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'none',
  order?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'first' | 'none',
  alignSelf?: "start" | "end" | "center" | "stretch" | null,
  displayFlex?: boolean
} & GlobalProps

const FlexItem = (props: FlexItemPropTypes): React.ReactElement => {
  const {
    children,
    className,
    fixedSize,
    grow,
    htmlOptions = {},
    shrink,
    flex = 'none',
    order = 'none',
    alignSelf,
    displayFlex
  } = props
  const growClass = grow === true ? 'pb_flex_item_kit_grow' : ''
  const displayFlexClass = displayFlex === true ? 'pb_flex_item_kit_display_flex' : ''
  const flexClass = flex !== 'none' ? `pb_flex_item_kit_flex_${flex}` : ''
  const shrinkClass = shrink === true ? 'pb_flex_item_kit_shrink' : ''
  const alignSelfClass = alignSelf ? `pb_flex_item_kit_align_self_${alignSelf}` : ''
  const fixedStyle =
    fixedSize !== undefined ? { flexBasis: `${fixedSize}` } : null
  const orderClass = order !== 'none' ? `pb_flex_item_kit_order_${order}` : ''
  const dynamicInlineProps = globalInlineProps(props)
  const combinedStyles = {
    ...fixedStyle,
    ...dynamicInlineProps
  }

  const htmlProps = buildHtmlProps(htmlOptions)


  return (
    <div
        {...htmlProps}
        className={classnames(
          'pb_flex_item_kit',
          growClass,
          shrinkClass,
          flexClass,
          displayFlexClass,
          orderClass,
          alignSelfClass,
          globalProps(props),
          className
        )}
        style={combinedStyles}
    >
      {children}
    </div>
  )
}

export default FlexItem
