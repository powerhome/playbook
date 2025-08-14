import React from 'react'
import classnames from 'classnames'
import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps, globalInlineProps } from '../utilities/globalProps'
import { GenericObject, Sizes } from '../types'

type SizeType = Sizes | "none"
type SizeResponsiveType = { [key: string]: SizeType }

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
  gap?: SizeType | SizeResponsiveType,
  rowGap?: SizeType | SizeResponsiveType,
  columnGap?: SizeType | SizeResponsiveType,
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
    orientation !== undefined ? `orientation_${orientation}` : ''
  const justifyClass =
    justify !== 'none' ? `justify_content_${justify}` : `justify_content_${horizontal}`
  const alignClass = align !== 'none' ? `align_items_${align}` : `align_items_${vertical}`
  const inlineClass = inline === true ? 'inline' : ''
  const spacingClass = spacing !== undefined ? `spacing_${spacing}` : ''
  const gapClass = (gap !== 'none' && typeof gap === 'object') ? `gap_${gap}` : ''
  const rowGapClass = (rowGap !== 'none' && typeof rowGap === 'object') ? `rowGap_${rowGap}` : ''
  const columnGapClass = (columnGap !== 'none' && typeof columnGap === 'object') ? `columnGap_${columnGap}` : ''
  const wrapClass = wrap === true ? 'wrap' : ''
  const reverseClass = reverse === true ? 'reverse' : ''
  const alignSelfClass = alignSelf !== 'none' ? `align_self_${alignSelf}` : ''
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const dynamicInlineProps = globalInlineProps(props)


  return (
    <div
        className={classnames(
        buildCss(
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
          alignSelfClass
        ),
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
