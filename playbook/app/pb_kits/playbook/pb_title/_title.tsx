import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { deprecatedProps, GlobalProps, globalProps } from '../utilities/globalProps'

type SizeType = 1 | 2 | 3 | 4 | "1" | "2" | "3" | "4" | "display"
type SizeResponsiveType = {[key: string]: SizeType}

type TitleProps = {
  aria?: {[key: string]: string},
  bold?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  color?: "default" | "light" | "lighter" | "success" | "error" | "link",
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  size?: SizeType | SizeResponsiveType,
  displaySize?: null | "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span",
  text?: string,
  variant?: null | "link",
} & GlobalProps

const Title = (props: TitleProps): React.ReactElement => {
  if (props.variant) deprecatedProps() //variant prop is deprecated, use color instead
  const {
    aria = {},
    children,
    className,
    color,
    data = {},
    htmlOptions = {},
    id,
    size = 3,
    displaySize = null,
    bold = true,
    tag = 'h3',
    text,
    variant = null,
  } = props

  const ariaProps: {[key: string]: string | number} = buildAriaProps(aria)
  const dataProps: {[key: string]: string | number} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const getBold = bold ? '' : 'thin'
  const isSizeNumberOrString = typeof size === "number" || typeof size === "string"

  const buildResponsiveSizeCss = () => {
    let css = ''

    if (!isSizeNumberOrString) {
      Object.entries(size).forEach((sizeObj) => {
        css += `pb_title_kit_${sizeObj[0]}_${sizeObj[1]} `
      })
    }

    return css.trim()
  }

  const buildDisplaySize = () => {
    if (displaySize) {
      return `pb_title_kit_dynamic_${displaySize}`
    }
  }

  const classes = classnames(
    buildCss('pb_title_kit', isSizeNumberOrString ? `size_${size}` : "", variant, color, getBold),
    globalProps(props),
    buildDisplaySize(),
    buildResponsiveSizeCss(),
    className
  )
  const Tag: React.ReactElement | any = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {text || children}
    </Tag>
  )
}

export default Title
