import React from 'react'
import classnames from 'classnames'
import { buildCss, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps, globalInlineProps } from '../utilities/globalProps'

type FlexItemPropTypes = {
  children: React.ReactNode[] | React.ReactNode,
  fixedSize?: string,
  grow?: boolean,
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
  shrink?: boolean,
  className?: string,
  order?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'first' | 'none',
  alignSelf?: "start" | "end" | "center" | "stretch" | null,
  displayFlex?: boolean,
  gap?: "space_xxs" | "space_xs" | "space_sm" | "space_md" | "space_lg" | "space_xl" | "none"
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
    displayFlex,
    gap = 'none',
  } = props

  const growClass = grow === true ? 'grow' : ''
  const displayFlexClass = displayFlex === true ? `display_flex_${displayFlex}` : ''
  const flexClass = flex !== 'none' ? `flex_${flex}` : ''
  const shrinkClass = shrink === true ? 'shrink' : ''
  const alignSelfClass = alignSelf ? `align_self_${alignSelf}` : ''
  const gapClass = gap !== 'none' ? `gap_size_${gap}` : ''
  const fixedStyle =
    fixedSize !== undefined ? { flexBasis: `${fixedSize}` } : null
  const orderClass = order !== 'none' ? `order_${order}` : null

  const dynamicInlineProps = globalInlineProps(props)
  const combinedStyles = {
    ...fixedStyle,
    ...dynamicInlineProps,
  }

  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <div
        {...htmlProps}
        className={classnames(
        buildCss(
          'pb_flex_item_kit',
          growClass,
          shrinkClass,
          flexClass,
          displayFlexClass,
          gapClass,
        ),
        orderClass,
        alignSelfClass,
        globalProps(props),
        className,
      )}
        style={combinedStyles}
    >
      {children}
    </div>
  )
}

export default FlexItem
