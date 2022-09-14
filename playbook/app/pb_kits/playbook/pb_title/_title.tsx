import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { deprecatedProps, GlobalProps, globalProps } from '../utilities/globalProps'

type TitleProps = {
  aria?: {[key: string]: string},
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  color?: "default" | "light" | "lighter" | "success" | "error" | "link",
  data?: {[key: string]: string},
  id?: string,
  size?: number | string,
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span",
  text?: string,
  variant?: null | "link",
} & GlobalProps

const Title = (props: TitleProps): React.ReactElement => {
  if (props.variant) deprecatedProps('Title', ['variant']) //variant prop is deprecated, use color instead
  const {
    aria = {},
    children,
    className,
    color,
    data = {},
    id,
    size = 3,
    tag = 'h3',
    text,
    variant = null,
  } = props

  const ariaProps: {[key: string]: string | number} = buildAriaProps(aria)
  const dataProps: {[key: string]: string | number} = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_title_kit', `size_${size}`, variant, color),
    globalProps(props),
    className,
  )
  const Tag: React.ReactElement | any = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {text || children}
    </Tag>
  )
}

export default Title
