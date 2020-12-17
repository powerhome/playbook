import React from 'react'

import { List, ListItem } from '../../'

const ListDefault = (props) => {
  return (
    <>
      <List>
        <ListItem>{'Item 1'}</ListItem>
        <ListItem>{'Item 2'}</ListItem>
        <ListItem>{'Item 3'}</ListItem>
        {...props}
      </List>
    </>
  )
}

export default ListDefault
