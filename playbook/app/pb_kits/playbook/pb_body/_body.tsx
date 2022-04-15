import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Highlight from '../pb_highlight/_highlight'

type BodyProps = {
  aria?: {[key: string]: string},
  className?: string,
  children?: array<React.ReactChild>,
  color?: 'default' | 'light' | 'lighter' | 'link',
  dark?: boolean,
  data?: {[key: string]: string},
  highlightedText?: array<string>,
  highlighting?: boolean,
  id?: string,
  status?: 'negative' | 'neutral' | 'positive',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
  variant: null | 'link',
}

const Body = (props: BodyProps) => {
  const {
    aria = {},
    className,
    children,
    color = '',
    data = {},
    highlightedText = [],
    highlighting = false,
    id,
    status,
    tag = 'div',
    text,
    variant = null,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_body_kit', color, variant, status),
    globalProps(props),
    className
  )
  const Tag = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={highlighting}>
        <Highlight highlightedText={highlightedText}>{text || children}</Highlight>
        <Else />
        { text || children }
      </If>
    </Tag>
  )
}

export default Body
