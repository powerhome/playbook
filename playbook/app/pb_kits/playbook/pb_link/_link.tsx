import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { deprecatedProps, globalProps, GlobalProps } from '../utilities/globalProps'

import Highlight from '../pb_highlight/_highlight'

type LinkProps = {
  aria?: {[key: string]: string},
  className?: string,
  children?: React.ReactChild[] | React.ReactChild,
  color?: 'default' | 'light' | 'lighter' | 'link' | 'error' | 'success',
  dark?: boolean,
  data?: {[key: string]: string},
  highlightedText?: string[],
  highlighting?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void) | ((arg?: Event) => void)},
  id?: string,
  status?: 'neutral' | 'negative' | 'positive',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
  variant?: null | 'link',
} & GlobalProps

const Link = (props: LinkProps): React.ReactElement => {
  if (props.variant) deprecatedProps() //status prop is deprecated, use color instead please
  const {
    aria = {},
    children,
    className,
    color = '',
    data = {},
    highlightedText = [],
    highlighting = false,
    htmlOptions = {},
    id = '',
    status = null,
    tag = 'div',
    text = '',
    variant = null,
  } = props

  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss('pb_link_kit', color, variant, status),
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
        id={id}
    >
      { highlighting && (
        <Highlight
            highlightedText={highlightedText}
            text={text}
        >
          {children}
        </Highlight>
      ) }
      { !highlighting && (
        text || children
      ) }
    </Tag>
  )
}

export default Link