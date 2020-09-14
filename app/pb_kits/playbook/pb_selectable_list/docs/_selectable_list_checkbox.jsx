import React from 'react'
import { SelectableList, SelectableListItem } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="checkbox">
        <SelectableListItem
            label="one"
            name="custom1"
        />
        <SelectableListItem
            checked
            label="two"
            name="custom2"
        />
        <SelectableListItem
            label="three"
            name="custom3"
        />
        <SelectableListItem
            label="four"
            name="custom4"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
