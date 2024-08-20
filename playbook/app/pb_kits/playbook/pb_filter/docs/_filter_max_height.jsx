import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from 'playbook-ui'

const FilterMaxHeight = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away, like really far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far away...' },
  ]
  return (
    <Filter
        {...props}
        double
        filters={{
          'Full Name': 'John Wick',
          'City': 'San Francisco',
        }}
        maxHeight="360px"
        minWidth="360px"
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
        <Select
            blankSelection="Select One..."
            label="Territory"
            name="location"
            options={options}
        />
        <TextInput
            label="First Name"
            placeholder="Enter name"
            {...props}
        />
        <TextInput
            label="Middle Name"
            placeholder="Enter name"
            {...props}
        />
        <TextInput
            label="Last Name"
            placeholder="Enter name"
            {...props}
        />
        <TextInput
            label="Email"
            placeholder="Enter email"
            {...props}
        />
        <TextInput
            label="Address"
            placeholder="Enter address"
            {...props}
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

export default FilterMaxHeight
