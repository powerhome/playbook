import React from 'react'

import Select from '../_select'

const SelectCustomSelectSubheaders = (props) => {
  return (
    <div>
      <Select
          label="Favorite Animal"
          {...props}
      >
        <select
            id="animal"
            name="animal"
            {...props}
        >
          <optgroup label="Mammal">
            <option value="1">{'Cat'}</option>
            <option value="2">{'Dog'}</option>
          </optgroup>
          <optgroup label="Amphibian">
            <option value="3">{'Frog'}</option>
            <option value="4">{'Salamander'}</option>
          </optgroup>
        </select>
      </Select>
    </div>
  )
}

export default SelectCustomSelectSubheaders
