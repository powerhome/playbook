import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="checkbox">
        <SelectableList.Item
            label="Mild"
            name="checkbox-name-1"
            value="1"
        />
        <SelectableList.Item
            checked
            label="Medium"
            name="checkbox-name-2"
            value="2"
        />
        <SelectableList.Item
            label="Hot"
            name="checkbox-name-3"
            value="3"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
