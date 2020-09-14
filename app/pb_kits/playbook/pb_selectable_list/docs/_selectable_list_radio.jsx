import React from 'react'
import { SelectableList, SelectableListItem } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableListItem
            defaultChecked={false}
            label="one"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked
            label="two"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked={false}
            label="three"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked={false}
            label="four"
            name="custom1"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
