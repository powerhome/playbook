/* @flow */

import React, { type Node } from 'react'

import { buildCss } from '../utilities/props'

type ListProps = {
  borderless: boolean,
  children: Array<Node> | Node,
  dark: boolean,
  layout: '' | 'left' | 'right',
  ordered: boolean,
  size: '' | 'large',
  xpadding: boolean,
}

const List = ({
  borderless = false,
  children,
  dark = false,
  layout = '',
  ordered = false,
  size = '',
  xpadding = false,
}: ListProps) => {
  const classes = buildCss('pb_list_kit', layout, size, {
    'dark': dark,
    'borderless': borderless,
    'ordered': ordered,
    'xpadding': xpadding,
  })

  return (
    <div className={classes}>
      <ul>
        {children}
      </ul>
    </div>
  )
}

export default List
