import React from 'react'

import { List, ListItem } from '../../'

const ListDark = () => {
  return (
    <>
      <List
          dark
      >
        <ListItem>{'Item 1'}</ListItem>
        <ListItem>{'Item 2'}</ListItem>
        <ListItem>{'Item 3'}</ListItem>
      </List>
    </>
  )
}

export default ListDark
