import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'

type ListItemProps = {
  aria?: { [key: string]: string },
  children: React.ReactNode[] | React.ReactNode,
  className?: string,
  data?: Record<string, unknown>,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  tabIndex?: number,
} & GlobalProps

const ListItem = (props: ListItemProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    tabIndex,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const classes = classnames(
    buildCss('pb_item_kit'),
    globalProps(props),
    className
  )

  return (
    <>
      <li
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          id={id}
          tabIndex={tabIndex}
      >
        {children}
      </li>
    </>
  )
}

export default ListItem
