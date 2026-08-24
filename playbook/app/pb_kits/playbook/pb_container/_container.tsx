
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type ContainerProps = {
  aria?: { [key: string]: string },
  children?: React.ReactNode,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) | ((event: any) => void) | any },
  tag?: "div" | "span" | "a" | "button" | "option" | "table" | "tbody" | "thead" | "tfoot" | "tr" | "td" | "th" | "img" | "section" | "article" | "main" | "header" | "footer" | "nav" | "aside"
  id?: string,
} & GlobalProps

const Container = (props: ContainerProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    tag = 'div',
    id,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(buildCss('pb_container_kit'), globalProps(props), className)

  const Tag = tag

  return (
    <Tag
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classes}
        id={id}
    >
      {children}
    </Tag>
  )
}

export default Container
