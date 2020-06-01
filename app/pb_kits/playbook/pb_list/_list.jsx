/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type ListProps = {
  borderless: boolean,
  children: Array<Node> | Node,
  dark: boolean,
  layout: "" | "left" | "right",
  ordered: boolean,
  size: "" | "large",
  xpadding: boolean,
}

const List = (props: ListProps) => {
  const {
    borderless = false,
    children,
    dark = false,
    layout = '',
    ordered = false,
    size = '',
    xpadding = false,
  } = props
  const classes = classnames(
    buildCss('pb_list_kit', layout, size, {
      dark: dark,
      borderless: borderless,
      ordered: ordered,
      xpadding: xpadding,
    }),
    spacing(props)
  )

  return (
    <div className={classes}>
      <ul>{children}</ul>
    </div>
  )
}

export default List
