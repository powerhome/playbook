import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const SortOnly = () => {
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
        sortMenu={[
      { item: 'Popularity', link: '#', active: true, direction: 'desc' },
      { item: 'Title', link: '#', active: false },
      { item: 'Name', link: '#', active: false },
    ]}
        template="sort_only"
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

export default SortOnly
