import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="checkbox">
        <SelectableList.Item
            id="checkbox-id-1"
            label="Mild"
            name="checkbox-name-1"
            value="1"
        />
        <SelectableList.Item
            checked
            id="checkbox-id-2"
            label="Medium"
            name="checkbox-name-2"
            value="2"
        />
        <SelectableList.Item
            id="checkbox-id-3"
            label="Hot"
            name="checkbox-name-3"
            value="3"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
