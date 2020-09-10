import React from 'react'
import { SelectableList, SelectableListItem } from '../..'

const SelectableListDefault = () => {
  return (

    <div>
      <SelectableList variant="radio">
        <SelectableListItem
            defaultChecked={false}
            label="Unselected"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked
            label="Selected"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked={false}
            label="Hover"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked={false}
            label="Unselected Last"
            name="custom1"
        />
      </SelectableList>
    </div>

  )
}

export default SelectableListDefault
