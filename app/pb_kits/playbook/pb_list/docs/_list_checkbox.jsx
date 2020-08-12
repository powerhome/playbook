import React from 'react'
import { Checkbox, List, ListItem } from '../../'

const ListDefault = () => {
  return (
    <>
      <List
          checkboxList
      >
        <ListItem>
            <Checkbox
                name="default name"
                text="Unselected"
                value="default value"
            />
        </ListItem>
        <ListItem>
            <Checkbox
                name="default name"
                text="Hover"
                value="default value"
            />
        </ListItem>
        <ListItem>
            <Checkbox
                checked
                name="checkbox-name"
                text="Selected"
                value="check-box value"
            />
        </ListItem>
        <ListItem>
            <Checkbox
                name="default name"
                text="Unselected Last"
                value="default value"
            />
        </ListItem>
      </List>
    </>
  )
}

export default ListDefault