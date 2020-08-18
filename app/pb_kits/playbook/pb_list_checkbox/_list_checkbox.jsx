

/* @flow */

import React from 'react'

import { List } from '../'

type ListCheckboxProps = {
  aria?: object,
  children: array<Node> | Node,
  className?: string,
  data?: object,
  id?: string,
}

const ListCheckbox = (props: ListCheckboxProps) => {
  const { children } = props
  return (
    <List>
      {children}
    </List>
  )
}


export default ListCheckbox
