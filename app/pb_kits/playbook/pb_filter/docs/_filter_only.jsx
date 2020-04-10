import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const FilterOnly = () => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A Galaxy Far Far Away Like Really Far Away' },
  ]
  return (
    <Filter
        background={false}
        filters={[
        { name: 'Full Name', value: 'John Wick' },
        { name: 'Territory', value: 'San Francisco' },
      ]}
        results={1}
        template="filter_only"
    >
      <TextInput
          label="Full Name"
          placeholder="Enter name"
      />

      <Select
          blankSelection="Select One..."
          label="Territory"
          name="location"
          options={options}
      />
      <Flex
          spacing="between"
      >
        <Button
            text="Apply"
        />
        <Button
            text="Clear"
            variant="secondary"
        />
      </Flex>
    </Filter>
  )
}

export default FilterOnly
