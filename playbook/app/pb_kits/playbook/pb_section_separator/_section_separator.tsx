import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, globalInlineProps, GlobalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'

type SectionSeparatorProps = {
  aria?: { [key: string]: string; },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  color?: "default" | "primary",
  dark?: boolean,
  data?: { [key: string]: string; },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  lineStyle?: "solid" | "dashed",
  orientation?: "horizontal" | "vertical",
  text?: string,
  variant?: "card" | "background",
} & GlobalProps

const SectionSeparator = (props: SectionSeparatorProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    color ="default",
    data = {},
    htmlOptions = {},
    id,
    lineStyle = 'solid',
    orientation = 'horizontal',
    text,
    dark = false,
    variant = 'card',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_section_separator_kit', variant, orientation, lineStyle === "dashed" ? lineStyle : "", color !== "default" ? `color_${color}` : ''), globalProps(props), className)
  const dynamicInlineProps = globalInlineProps(props)

  return (

    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
        style={dynamicInlineProps}
    >
      {
        children && children ||
        text && (
          <span>
            <Caption dark={dark}
                text={text}
            />
          </span>
        )
      }
    </div>
  )
}

export default SectionSeparator
