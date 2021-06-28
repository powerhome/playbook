import React from 'react'

import Select from '../_select'

const SelectCustomSelect = (props) => {
  return (
    <div>
      <Select
          label="Favorite Holiday"
          {...props}
      >
        <select
            id="holiday"
            name="holiday"
            {...props}
        >
          <option value="1">{'Christmas'}</option>
          <option value="2">{'Thanksgiving'}</option>
          <option value="3">{'Halloween'}</option>
          <option value="4">{'Fourth of July'}</option>
        </select>
      </Select>
    </div>
  )
}

export default SelectCustomSelect
