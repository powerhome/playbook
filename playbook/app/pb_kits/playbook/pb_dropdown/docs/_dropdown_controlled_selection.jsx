import React, { useState } from 'react'
import Dropdown from '../_dropdown'

const options = [
  { id: 'engineering', label: 'Engineering', value: 'engineering' },
  { id: 'operations', label: 'Operations', value: 'operations' },
  { id: 'sales', label: 'Sales', value: 'sales' },
]

const DropdownControlledSelection = () => {
  const [selected, setSelected] = useState([])

  return (
    <Dropdown
        label="Departments"
        multiSelect
        onSelect={setSelected}
        options={options}
        value={selected}
    />
  )
}

export default DropdownControlledSelection
