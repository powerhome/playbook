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
  const isSizeNumberOrString = typeof size === "number" || typeof size === "string"

  const buildResponsiveSizeCss = () => {
    const classes: string[] = []

    if (!isSizeNumberOrString) {
      Object.entries(size).forEach((sizeObj) => {
        classes.push(`pb_title_${sizeObj[0]}_${sizeObj[1]}`)
      })
    }

    return classes
  }

  const buildDisplaySize = () => {
    if (displaySize) {
      return [`pb_title_dynamic_${displaySize}`]
    }
    return []
  }

  const titleClasses = ['pb_title_kit']
  
  if (isSizeNumberOrString) {
    titleClasses.push(`pb_title_${size}`)
  }
  if (variant) titleClasses.push(`pb_title_${variant}`)
  if (color) titleClasses.push(`pb_title_${color}`)
  if (!bold) titleClasses.push('pb_title_thin')
  titleClasses.push(...buildDisplaySize())
  titleClasses.push(...buildResponsiveSizeCss())

  const classes = classnames(
    titleClasses.join(' '),
    globalProps(props),
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
