import React from 'react'

import List from '../_list'
import ListItem from '../_list_item'

const ListXpadding = (props) => {
  return (
    <>
      <List
          xpadding
          {...props}
      >
        <ListItem>{'Item 1'}</ListItem>
        <ListItem>{'Item 2'}</ListItem>
        <ListItem>{'Item 3'}</ListItem>
        <ListItem>{'Item 4'}</ListItem>
        <ListItem>{'Item 5'}</ListItem>
      </List>
    </>
  )
}

export default ListXpadding
