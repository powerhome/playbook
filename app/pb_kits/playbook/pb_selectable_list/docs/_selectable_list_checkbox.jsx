import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="checkbox">
        <SelectableList.Item
            label="Monday"
            name="custom1"
        />
        <SelectableList.Item
            checked
            label="Tuesday"
            name="custom2"
        />
        <SelectableList.Item
            label="Wednesday"
            name="custom3"
        />
        <SelectableList.Item
            label="Thursday"
            name="custom4"
        />
        <SelectableList.Item
            label="Friday"
            name="custom5"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
