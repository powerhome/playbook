import React from 'react'

import List from '../_list'
import ListItem from '../_list_item'

const ListBorderless = (props) => {
  return (
    <>
      <List
          borderless
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

export default ListBorderless
