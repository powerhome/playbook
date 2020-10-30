import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableList.Item
            id="radio-id-1"
            label="Small"
            name="radio"
            value="1"
        />
        <SelectableList.Item
            defaultChecked
            id="radio-id-2"
            label="Medium"
            name="radio"
            value="2"
        />
        <SelectableList.Item
            id="radio-id-3"
            label="Large"
            name="radio"
            value="3"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
