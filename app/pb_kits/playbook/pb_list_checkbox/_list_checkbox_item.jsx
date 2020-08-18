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

const handleSelect = (event) => {
  const element = event.target
  const listItem = element.parentNode.parentNode
  if(element.checked){
    listItem.className += ' checked'
  } else {
    const ans = listItem.className.split(' ')
    ans.pop()
    listItem.className = ans.join(' ')
  }
}


const ListCheckboxItem = (props: ListCheckboxItemProps) => {

  let className = 'pb_checkbox_item_kit'
  if(props.checked){
    className += ' checked'
  }
  return (
    <ListItem className={className}>
      <Checkbox {...props} onChange={handleSelect}/>
    </ListItem>
  )
}

export default ListCheckboxItem