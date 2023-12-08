import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Caption from '../pb_caption/_caption'

type SectionSeparatorProps = {
  aria?: { [key: string]: string; },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  dark?: boolean,
  data?: { [key: string]: string; },
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
  lineStyle?: "solid" | "dashed",
  orientation?: "horizontal" | "vertical",
  text?: string,
  variant?: "card" | "background",
}

const SectionSeparator = (props: SectionSeparatorProps) => {
  const {
    aria = {},
    children,
    className,
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
  const classes = classnames(buildCss('pb_section_separator_kit', variant, orientation, lineStyle === "dashed" ? lineStyle : ""), globalProps(props), className)

  return (

    <div
      {...ariaProps}
      {...dataProps}
      {...htmlProps}
      className={classes}
      id={id}
    >
      {
        children && children ||
        text && (
          <span>
            <Caption text={text} dark={dark} />
          </span>
        )
      }
    </div>
  )
}

export default SectionSeparator
