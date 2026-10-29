import React, { useState } from 'react'
import { Body, Button, Dropdown, Flex } from 'playbook-ui'

const options = [
  { label: 'Year', value: 'year', id: 'year' },
  { label: 'Territory', value: 'territory', id: 'territory' },
  { label: 'Branch', value: 'branch', id: 'branch' },
  { label: 'Product', value: 'product', id: 'product' },
]

const DropdownDraggablePills = (props) => {
  const [value, setValue] = useState([
    options[0],
    options[1],
    options[2],
  ])

  const currentOrder = value.map((item) => item.label).join(' -> ')

  const handleReset = () => {
    setValue([options[0], options[1], options[2]])
  }

  return (
    <Flex
        align="stretch"
        gap="sm"
        orientation="column"
    >
      <Flex
          align="center"
          justify="between"
      >
        <Body text="Select services, then drag the pills to reorder them." />
        <Button
            onClick={handleReset}
            text="Reset"
            variant="secondary"
        />
      </Flex>

      <Dropdown
          enablePillReorder
          label="Services"
          multiSelect
          onChange={({ target }) => setValue(target.value || [])}
          options={options}
          placeholder="Add services..."
          showPillIndex
          value={value}
          {...props}
      />

      <Body
          color="lighter"
          text={`Current order: ${currentOrder}`}
      />
    </Flex>
  )
}

export default DropdownDraggablePills
