import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { deprecatedProps, globalProps } from '../utilities/globalProps'

type CaptionProps = {
  aria?: {[key: string]: string},
  children: React.ReactChild[], //what would I put after the | where it said React.ReactChild before?
  className?: string,
  color?: "default" | "light" | "lighter" | "success" | "error" | "link",
  data?: {[key: string]: string}, //how do you know if its a situation that will take mult data types?
  id?: string,
  size?: "xs" | "sm" | "md" | "lg" | "xl",
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "caption",
  text?: string,
  variant?: null | "link",
};

const Caption = (props: CaptionProps) => {
  if (props.variant) deprecatedProps('Title', ['variant']) //variant prop is deprecated, use color instead
  const {
    aria = {},
    children,
    className,
    color,
    data = {},
    id,
    size = 'md',
    tag = 'div',
    text,
    variant = null,
  } = props
  const tagOptions = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'span',
    'div',
    'caption',
  ]
  const Tag = tagOptions.includes(tag) ? tag : 'div'

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(
    buildCss('pb_caption_kit', size, variant, color),
    globalProps(props),
    className,
  )

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      {text || children}
    </Tag>
  )
}

export default Caption
