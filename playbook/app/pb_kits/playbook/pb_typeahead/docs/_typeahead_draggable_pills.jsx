import React, { useState } from 'react'
import { Body, Button, Flex, Typeahead } from 'playbook-ui'

const options = [
  { label: 'Year', value: 'year' },
  { label: 'Territory', value: 'territory' },
  { label: 'Branch', value: 'branch' },
  { label: 'Product', value: 'product' },
]

const TypeaheadDraggablePills = (props) => {
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

      <Typeahead
          enablePillReorder
          isMulti
          label="Services"
          onChange={setValue}
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

export default TypeaheadDraggablePills
