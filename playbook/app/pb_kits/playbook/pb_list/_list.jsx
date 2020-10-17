/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type ListProps = {
  aria?: object,
  borderless: boolean,
  className?: string,
  children: array<Node> | Node,
  dark: boolean,
  data?: object,
  id?: string,
  layout: "" | "left" | "right",
  ordered: boolean,
  role?: string,
  tabIndex?: string,
  size?: string,
  xpadding: boolean,
}

const List = (props: ListProps) => {
  const {
    aria = {},
    borderless = false,
    children,
    className,
    dark = false,
    data = {},
    id,
    layout = '',
    ordered = false,
    role,
    size = '',
    tabIndex,
    xpadding = false,
  } = props

  const layoutClass = {
    left: 'layout_left',
    right: 'layout_right',
    default: '',
  }

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_list_kit', layoutClass[layout], size, {
      dark: dark,
      borderless: borderless,
      ordered: ordered,
      xpadding: xpadding,
    }),
    globalProps(props),
    className
  )

  return (
    <div
        className={classes}
    >
      <If condition={ordered}>
        <ol
            {...ariaProps}
            {...dataProps}
            className={className}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
          {children}
        </ol>
        <Else />
        <ul
            {...ariaProps}
            {...dataProps}
            className={className}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
          {children}
        </ul>
      </If>
    </div>
  )
}

export default List
