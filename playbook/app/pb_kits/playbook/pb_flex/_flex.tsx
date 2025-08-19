import React from 'react'
import classnames from 'classnames'
import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps, globalInlineProps } from '../utilities/globalProps'
import { GenericObject, Sizes } from '../types'

type FlexProps = {
  children: React.ReactChild[] | React.ReactNode,
  className?: string,
  data?: GenericObject,
  horizontal?: "left" | "center" | "right" | "stretch" | "none",
  justify?: "start" | "center" | "end" | "around" | "between" | "evenly" | "none",
  htmlOptions?: {[key: string]: string | number | boolean | (() => void) | ((arg?: unknown) => void)},
  id?: string,
  inline?: boolean,
  orientation?: "row" | "column",
  spacing?: "around" | "between" | "evenly" | "none",
  reverse?: boolean,
  vertical?: "top" | "center" | "bottom" | "stretch" | "baseline" | "none",
  align?: "start" | "center" | "end" | "stretch" | "baseline" | "none",
  gap?: Sizes | "none",
  rowGap?: Sizes| "none",
  columnGap?: Sizes| "none",
  wrap?: boolean,
  alignSelf?: "start" | "end" | "center" | "stretch" | "none"
} & GlobalProps

const Flex = (props: FlexProps): React.ReactElement => {
  const {
    align = 'none',
    children,
    className,
    data = {},
    inline = false,
    horizontal = 'left',
    htmlOptions = {},
    justify = 'none',
    orientation = 'row',
    spacing = 'none',
    gap = 'none',
    rowGap = 'none',
    columnGap = 'none',
    reverse = false,
    vertical = 'top',
    wrap = false,
    alignSelf = 'none',
  } = props

  const orientationClass =
    orientation !== undefined ? `pb_flex_kit_orientation_${orientation}` : ''
  const justifyClass =
    justify !== 'none' ? `pb_flex_kit_justify_content_${justify}` : `pb_flex_kit_justify_content_${horizontal}`
  const alignClass = align !== 'none' ? `pb_flex_kit_align_items_${align}` : `pb_flex_kit_align_items_${vertical}`
  const inlineClass = inline === true ? 'pb_flex_kit_inline' : ''
  const spacingClass = spacing !== undefined ? `pb_flex_kit_spacing_${spacing}` : ''
  const gapClass = gap !== 'none' ? `pb_flex_kit_gap_${gap}` : ''
  const rowGapClass = rowGap !== 'none' ? `pb_flex_kit_rowGap_${rowGap}` : ''
  const columnGapClass = columnGap !== 'none' ? `pb_flex_kit_columnGap_${columnGap}` : ''
  const wrapClass = wrap === true ? 'pb_flex_kit_wrap' : ''
  const reverseClass = reverse === true ? 'pb_flex_kit_reverse' : ''
  const alignSelfClass = alignSelf !== 'none' ? `pb_flex_kit_align_self_${alignSelf}` : ''
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const dynamicInlineProps = globalInlineProps(props)


  return (
    <div
        className={classnames(
        'pb_flex_kit',
        orientationClass,
        justifyClass,
        alignClass,
        inlineClass,
        reverseClass,
        wrapClass,
        spacingClass,
        gapClass,
        rowGapClass,
        columnGapClass,
        alignSelfClass,
        globalProps(props),
        className
      )}
        style={dynamicInlineProps}
        {...dataProps}
        {...htmlProps}
    >
      {children}
    </div>
  )
}

export default Flex
