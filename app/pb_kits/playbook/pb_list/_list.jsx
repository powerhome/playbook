/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type ListProps = {
  aria?: object,
  borderless: Boolean,
  className?: String,
  children: Array<Node> | Node,
  dark: Boolean,
  data?: object,
  id?: String,
  layout: "" | "left" | "right",
  ordered: Boolean,
  role?: String,
  tabIndex?: String,
  size?: String,
  xpadding: Boolean,
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
    }), className,
    spacing(props)
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
