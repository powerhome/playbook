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
  text?: string,
}

const ListCheckboxItem = (props: ListCheckboxItemProps) => {
  const { text } = props
  return (
    <ListItem className="pb_checkbox_item_kit">
      <Checkbox text={text}/>
    </ListItem>
  )
}

export default ListCheckboxItem