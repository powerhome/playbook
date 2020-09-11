import React from 'react'
import { SelectableList, SelectableListItem } from '../..'

const SelectableListDefault = () => {
  return (

    <div>
      <SelectableList variant="checkbox">
        <SelectableListItem
            defaultChecked={false}
            label="one"
            name="custom1"
        />
        <SelectableListItem
            defaultChecked
            label="two"
            name="custom2"
        />
        <SelectableListItem
            defaultChecked={false}
            label="three"
            name="custom3"
        />
        <SelectableListItem
            defaultChecked={false}
            label="four"
            name="custom4"
        />
      </SelectableList>
    </div>

  )
}

export default SelectableListDefault