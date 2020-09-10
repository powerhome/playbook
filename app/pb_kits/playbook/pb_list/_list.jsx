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
  text?: string,
  size?: string,
  variant?: string,
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
    variant,
    text,
  } = props

  const layoutClass = {
    left: 'layout_left',
    right: 'layout_right',
    default: '',
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { text, variant })
  })
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_list_kit', layoutClass[layout], size, {
      dark: dark,
      borderless: borderless,
      ordered: ordered,
      xpadding: xpadding,
    }), className,
    globalProps(props)
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
          {childrenWithProps}
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
          {childrenWithProps}
        </ul>
      </If>
    </div>
  )
}

export default List
