import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableList.Item
            id="radio-id-1"
            label="Monday"
            name="radio"
            value="1"
        />
        <SelectableList.Item
            defaultChecked
            id="radio-id-2"
            label="Tuesday"
            name="radio"
            value="2"
        />
        <SelectableList.Item
            id="radio-id-3"
            label="Wednesday"
            name="radio"
            value="3"
        />
        <SelectableList.Item
            id="radio-id-4"
            label="Thursday"
            name="radio"
            value="4"
        />
        <SelectableList.Item
            id="radio-id-5"
            label="Friday"
            name="radio"
            value="5"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
