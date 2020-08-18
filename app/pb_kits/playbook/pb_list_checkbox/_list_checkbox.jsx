

/* @flow */

import React from 'react'

import { List } from '../'
import ListCheckboxItem from '../pb_list_checkbox/_list_checkbox_item'

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
