/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type ListItemProps = {
  aria?: object,
  children: Array<Node> | Node,
  className?: String,
  data?: object,
  id?: String,
  tabIndex?: String,
}

const ListItem = (props: ListItemProps) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
    tabIndex,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_item_kit'), className,
    spacing(props)
  )

  return (
    <>
      <li
          {...ariaProps}
          {...dataProps}
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
