import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const FilterOnly = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away...' },
  ]
  return (
    <Filter
        filters={{ 'Full Name': 'John Wick' }}
        minWidth="360px"
        {...props}
    >
    {({ closePopover }) => (
      <form>

        <TextInput
            label="Full Name"
            placeholder="Enter name"
            {...props}
        />

        <Select
            blankSelection="Select One..."
            label="Territory"
            name="location"
            options={options}
            {...props}
        />
        <Flex
            spacing="between"
            {...props}
        >
          <Button
              onClick={closePopover}
              text="Apply"
              {...props}
          />
          <Button
              text="Clear"
              variant="secondary"
              {...props}
          />
        </Flex>
      </form>
    )}

    </Filter>
  )
}

export default FilterOnly
