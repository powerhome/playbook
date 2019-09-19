/* @flow */

import React from 'react'
import classnames from 'classnames'

type BodyProps = {
  className?: String,
  children?: Array<React.ReactChild>,
  color: 'light' | 'lighter',
  dark?: Boolean,
  status?: 'negative' | 'positive',
  tag: String,
  text?: String,
}

const bodyCSS = ({
  color='light',
  dark=false,
  status='',

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
    tag='p',
  } = props

  const Tag = `${tag}`
    
  return (
    <Tag className={classnames(bodyCSS(props), className)}>
      { text || children }
    </Tag>
  )
}

export default Body
