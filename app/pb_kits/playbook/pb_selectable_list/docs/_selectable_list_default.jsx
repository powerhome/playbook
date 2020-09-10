import React from 'react'
import { ListItem, SelectableListItem, SelectableList } from '../..'

const SelectableListDefault = () => {
  return (

    <div>
      <SelectableList>
        <ListItem>
          <SelectableListItem
              defaultChecked={false}
              label="Unselected"
              name="custom1"
          />
        </ListItem>
        <ListItem>
          <SelectableListItem
              defaultChecked
              label="Selected"
              name="custom1"
          />
        </ListItem>
        <ListItem>
          <SelectableListItem
              defaultChecked={false}
              label="Hover"
              name="custom1"
          />
        </ListItem>
        <ListItem>
          <SelectableListItem
              defaultChecked={false}
              label="Unselected Last"
              name="custom1"
          />
        </ListItem>
      </SelectableList>
    </div>

  )
}

export default SelectableListDefault
