import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type DetailProps = {
  aria?: { [key: string]: string },
  bold?: boolean,
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  color?: 'light' | 'default' | 'lighter' | 'link' | 'error' | 'success',
  dark?: boolean,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div',
  text?: string,
} & GlobalProps

const Detail = (props: DetailProps): React.ReactElement => {
  const {
    aria = {},
    bold = false,
    children,
    className,
    color = 'light',
    data = {},
    htmlOptions = {},
    id = '',
    tag = 'div',
    text= ''
  } = props

  const ariaProps: {[key: string]: string} = buildAriaProps(aria)
  const dataProps: {[key: string]: string} = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions);
  const isBold = bold ? "bold" : null
  const classes = classnames(
    buildCss('pb_detail_kit', `color`, color),
    isBold,
    globalProps(props),
    className
  )
  const Tag: React.ReactElement | any = `${tag}`

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {text || children}
    </Tag>
  )
}

export default Detail
