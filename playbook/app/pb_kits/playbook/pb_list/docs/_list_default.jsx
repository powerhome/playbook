import React from 'react'

import List from '../_list'
import ListItem from '../_list_item'

const ListDefault = () => {
  return (
    <>
      <List>
        <ListItem>{'Item 1'}</ListItem>
        <ListItem>{'Item 2'}</ListItem>
        <ListItem>{'Item 3'}</ListItem>
      </List>
    </>
  )
}

export default ListDefault
