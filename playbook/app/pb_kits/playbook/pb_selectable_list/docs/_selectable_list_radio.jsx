import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableList.Item
            label="Small"
            name="radio"
            value="1"
        />
        <SelectableList.Item
            defaultChecked
            label="Medium"
            name="radio"
            value="2"
        />
        <SelectableList.Item
            label="Large"
            name="radio"
            value="3"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
