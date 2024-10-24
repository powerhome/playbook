import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

import Icon from '../pb_icon/_icon'

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
  icon?: string,
  iconRight?: string,
  id?: string,
  tag?: 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
  underline?: boolean,
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
    icon = '',
    iconRight = '',
    id = '',
    tag = 'a',
    text = '',
    underline = false,
    variant = '',
  } = props

  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_link_kit', color, variant, underline ? 'underline' : '', disabled ? 'disabled' : ''),
    globalProps(props),
    className
  )
  const Tag: keyof JSX.IntrinsicElements = `${tag}`

  const content = (
    <>
      {icon && (
        <Icon
            fixedWidth
            icon={icon}
            marginRight="xxs"
            size="xs"
        />
      )}
      {text || children}
      {iconRight && (
        <Icon
            fixedWidth
            icon={iconRight}
            marginLeft="xxs"
            size="xs"
        />
      )}
    </>
  )

  if (tag === 'a') {
    return (
      <Tag
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          href={href}
          id={id}
      >
        {content}
      </Tag>
    )
  } else {
    return (
      <a
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          href={href}
          id={id}
      >
        <Tag>
          {content}
        </Tag>
      </a>
    )
  }

}

export default Link