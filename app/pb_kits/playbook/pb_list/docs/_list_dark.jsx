import React from 'react'

import { List, ListItem } from '../../'

const ListDark = () => {
  return (
    <>
      <List
          borderless
          dark
          layout="right"
          ordered
          size='large'
          xpadding
      >
        <ListItem>{'Item 1'}</ListItem>
        <ListItem>{'Item 2'}</ListItem>
        <ListItem>{'Item 3'}</ListItem>
      </List>
    </>
  )
}

export default ListDark
