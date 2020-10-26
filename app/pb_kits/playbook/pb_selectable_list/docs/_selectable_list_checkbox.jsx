import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="checkbox">
        <SelectableList.Item
            id="checkbox-id-1"
            label="Monday"
            name="checkbox-name-1"
            value="1"
        />
        <SelectableList.Item
            checked
            id="checkbox-id-2"
            label="Tuesday"
            name="checkbox-name-2"
            value="2"
        />
        <SelectableList.Item
            id="checkbox-id-3"
            label="Wednesday"
            name="checkbox-name-3"
            value="3"
        />
        <SelectableList.Item
            id="checkbox-id-4"
            label="Thursday"
            name="checkbox-name-4"
            value="4"
        />
        <SelectableList.Item
            id="checkbox-id-5"
            label="Friday"
            name="checkbox-name-5"
            value="5"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
