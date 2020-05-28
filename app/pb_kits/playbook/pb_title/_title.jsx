/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

type TitleProps = {
  className?: String,
  children?: Array<React.ReactNode> | React.ReactNode,
  dark?: Boolean,
  size?: 1 | 2 | 3 | 4,
  text?: String,
  tag?: "h1" | "h2" | "h3",
}

const tagCSS = ({ dark = false, size = 3 }) => {
  let css = ''

  css += `_${size}`
  css += dark === true ? '_dark' : ''

  return css
}

const Title = (props: TitleProps) => {
  const { children, className, tag = 'h3', text } = props

  const Tag = `${tag}`

  return (
    <Tag
        className={classnames(
        `pb_title_kit${tagCSS(props)}`,
        className,
        spacing(props),
      )}
    >
      {text || children}
    </Tag>
  )
}

export default Title
