import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type LinkProps = {
  aria?: {[key: string]: string},
  className?: string,
  children?: React.ReactChild[] | React.ReactChild,
  color?: 'default' | 'body' | 'muted' | 'destructive',
  dark?: boolean,
  data?: {[key: string]: string},
  disabled?: boolean,
  href?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void)},
  id?: string,
  tag?: 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
  underlined?: boolean,
  variant?: '' | 'link',
} & GlobalProps

const Link = (props: LinkProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    color = '',
    data = {},
    disabled = false,
    href= '',
    htmlOptions = {},
    id = '',
    tag = 'a',
    text = '',
    underlined = false,
    variant = '',
  } = props

  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_link_kit', color, variant, underlined ? 'underlined' : '', disabled ? 'disabled' : ''),
    globalProps(props),
    className
  )
  const Tag: keyof JSX.IntrinsicElements = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        href={href}
        id={id}
    >
      { text || children }
    </Tag>
  )
}

export default Link