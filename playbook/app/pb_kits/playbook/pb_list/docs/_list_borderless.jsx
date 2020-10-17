import React from 'react'

import { List, ListItem } from '../../'

const ListBorderless = () => {
  return (
    <>
      <List
          borderless
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
