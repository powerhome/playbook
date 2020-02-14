/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Highlight } from '../'

type BodyProps = {
  className?: String,
  children?: Array<React.ReactChild>,
  color: 'light' | 'lighter',
  dark?: Boolean,
  status?: 'negative' | 'positive',
  tag: String,
  text?: String,
  highlighting?: Boolean,
  highlightedText?: Array<String>
}

const bodyCSS = ({
  color = '',
  dark = false,
  status = '',

}: BodyProps) => {
  const colorStyle = color !== '' ? `_${color}` : ''

  const themeStyle = dark === true ? '_dark' : ''

  const statusStyle = status !== '' ? `_${status}` : ''

  return 'pb_body_kit' + colorStyle + themeStyle + statusStyle
}

const Body = (props: BodyProps) => {
  const {
    className,
    children,
    text,
    tag = 'div',
    highlightedText,
    highlighting = false,
  } = props

  const Tag = `${tag}`

  return (
    <Tag className={classnames(bodyCSS(props), className)}>
      <If condition={highlighting}>
        <Highlight highlightedText={highlightedText}>{text || children}</Highlight>
        <Else />
        { text || children }
      </If>
    </Tag>
  )
}

export default Body
