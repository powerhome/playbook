/* @flow */

import React from 'react'
import { Checkbox, ListItem } from '../'

type ListCheckboxItemProps = {
  aria?: object,
  children: array<Node> | Node,
  className?: string,
  data?: object,
  id?: string,
  tabIndex?: string,
}

const ListCheckboxItem = (props: ListCheckboxItemProps) => {
  return (
    <ListItem className="pb_checkbox_item_kit">
      <Checkbox {...props}/>
    </ListItem>
  )
}

export default ListCheckboxItem