import React, { useState } from 'react'
import Dropdown from '../_dropdown'

const options = [
  { id: 0, label: 'Alex Morgan', value: 'alex-engineering', department: 'Engineering' },
  { id: 1, label: 'Alex Morgan', value: 'alex-operations', department: 'Operations' },
]
const optionId = (option) => option.id
const renderPerson = (option) => `${option.label} — ${option.department}`

const DropdownControlledSelection = () => {
  const [selected, setSelected] = useState([])

  return (
    <Dropdown
        getOptionValue={optionId}
        label="People"
        multiSelect
        onSelect={setSelected}
        options={options}
        renderOption={renderPerson}
        value={selected}
    />
  )
}

export default DropdownControlledSelection
