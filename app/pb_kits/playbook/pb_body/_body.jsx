/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Highlight } from '../'
import { globalProps } from '../utilities/globalProps.js'

type BodyProps = {
  aria?: object,
  className?: string,
  children?: array<React.ReactChild>,
  color?: 'default' | 'light' | 'lighter',
  dark?: boolean,
  data?: object,
  highlightedText?: array<string>,
  highlighting?: boolean,
  id?: string,
  status?: 'negative' | 'neutral' | 'positive',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
}

const Body = (props: BodyProps) => {
  const {
    aria = {},
    className,
    children,
    color,
    data = {},
    highlightedText = [],
    highlighting = false,
    id,
    status,
    tag = 'div',
    text,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_body_kit', color, status),
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
