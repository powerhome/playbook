import React from 'react'

import { List, ListItem } from '../../'

const ListLayoutRight = () => {
  return (
    <>
      <List
          layout="right"
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

export default ListLayoutRight
