import React from 'react'
import { SelectableList } from '../..'

const SelectableListDefault = () => {
  return (
    <div>
      <SelectableList variant="radio">
        <SelectableList.Item
            defaultChecked={false}
            label="Monday"
            name="custom1"
        />
        <SelectableList.Item
            defaultChecked
            label="Tuesday"
            name="custom1"
        />
        <SelectableList.Item
            defaultChecked={false}
            label="Wednesday"
            name="custom1"
        />
        <SelectableList.Item
            defaultChecked={false}
            label="Thursday"
            name="custom1"
        />
        <SelectableList.Item
            defaultChecked={false}
            label="Friday"
            name="custom1"
        />
      </SelectableList>
    </div>
  )
}

export default SelectableListDefault
