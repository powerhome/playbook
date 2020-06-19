import React from 'react'

import { List, ListItem } from '../../'

const ListDarkBorderless = () => {
  return (
    <>
      <List
          borderless
          dark
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

export default ListDarkBorderless
