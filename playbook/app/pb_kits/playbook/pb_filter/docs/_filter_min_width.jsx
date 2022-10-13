import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const FilterMinWidth = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away, like really far away...' },
  ]
  return (
    <Filter
        {...props}
        double
        filters={{
          'Full Name': 'John Wick',
          'City': 'San Francisco',
        }}
        minWidth="375px"
        results={1}
        sortOptions={{
          popularity: 'Popularity',
          // eslint-disable-next-line
          manager_title: 'Manager\'s Title',
          // eslint-disable-next-line
          manager_name: 'Manager\'s Name',
        }}
        sortValue={[{ name: 'popularity', dir: 'desc' }]}
    >
    {({ closePopover }) => (
      <form>

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
              onClick={closePopover}
              text="Apply"
          />
          <Button
              text="Clear"
              variant="secondary"
          />
        </Flex>
      </form>
    )}
    </Filter>
  )
}

export default FilterMinWidth
