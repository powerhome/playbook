import React from 'react'
import { SelectableList } from 'playbook-ui'

const SelectableListDefault = (props) => {
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableList.Item
            label="Small"
            name="radio"
            value="1"
            {...props}
        />
        <SelectableList.Item
            defaultChecked
            label="Medium"
            name="radio"
            value="2"
            {...props}
        />
        <SelectableList.Item
            label="Large"
            name="radio"
            value="3"
            {...props}
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
