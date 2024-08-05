import React from 'react'
import { SelectableList } from 'playbook-ui'

const SelectableListDefault = (props) => {
  return (
    <div>
      <SelectableList variant="checkbox">
        <SelectableList.Item
            label="Mild"
            name="checkbox-name-1"
            value="1"
            {...props}
        />
        <SelectableList.Item
            checked
            label="Medium"
            name="checkbox-name-2"
            value="2"
            {...props}
        />
        <SelectableList.Item
            label="Hot"
            name="checkbox-name-3"
            value="3"
            {...props}
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
