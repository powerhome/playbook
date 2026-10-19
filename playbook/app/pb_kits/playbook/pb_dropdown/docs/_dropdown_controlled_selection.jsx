import React, { useState } from 'react'
import Button from '../../pb_button/_button'
import Dropdown from '../_dropdown'
import Flex from '../../pb_flex/_flex'

const options = [
  { id: 'engineering', label: 'Engineering', value: 'engineering' },
  { id: 'operations', label: 'Operations', value: 'operations' },
  { id: 'sales', label: 'Sales', value: 'sales' },
]

const DropdownControlledSelection = (props) => {
  const [selected, setSelected] = useState([])

  return (
    <>
      <Dropdown
          label="Departments"
          marginBottom="sm"
          multiSelect
          onSelect={setSelected}
          options={options}
          value={selected}
          {...props}
      />
      <Flex gap="xs">
        <Button
            onClick={() => setSelected(options)}
            text="Select All"
            variant="secondary"
        />
        <Button
            onClick={() => setSelected([])}
            text="Clear"
            variant="secondary"
        />
      </Flex>
    </>
  )
}

export default DropdownControlledSelection
