/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { Highlight } from '../'
import { globalProps } from '../utilities/globalProps.js'

type BodyProps = {
  aria?: object,
  className?: String,
  children?: Array<React.ReactChild>,
  color: 'dark' | 'default' | 'light' | 'lighter' | 'light_dark' | 'lighter_dark',
  dark?: Boolean,
  data?: object,
  highlightedText?: Array<String>,
  highlighting?: Boolean,
  id?: String,
  status?: 'negative' | 'neutral' | 'positive',
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: String,
}

const Body = (props: BodyProps) => {
  const {
    aria = {},
    className,
    children,
    color = '',
    dark = false,
    data = {},
    highlightedText = [],
    highlighting = false,
    id,
    status = '',
    tag = 'div',
    text,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_body_kit', color, status, {
      dark: dark,
    }),
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
