/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type ListItemProps = {
  aria?: object,
  children: array<Node> | Node,
  className?: string,
  data?: object,
  id?: string,
  tabIndex?: string,
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
    buildCss('pb_item_kit'),
    globalProps(props),
    className
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
