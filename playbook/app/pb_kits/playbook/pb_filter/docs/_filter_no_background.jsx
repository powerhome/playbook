import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const FilterNoBackground = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A Galaxy Far Far Away Like Really Far Away' },
  ]
  return (
    <>
      <Filter
          {...props}
          background={false}
          filters={{
          'Full Name': 'John Wick',
          'City': 'Las Vegas',
        }}
          results={3}
          sortOptions={{
          popularity: 'Popularity',
          // eslint-disable-next-line
          manager_title: 'Manager\'s Title',
          // eslint-disable-next-line
          manager_name: 'Manager\'s Name',
        }}
          sortValue={[{ name: 'popularity', dir: 'desc' }]}
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

      <Filter
          {...props}
          background={false}
          double
          filters={{
          'Full Name': 'John Wick',
          'City': 'Las Vegas',
        }}
          results={3}
          sortOptions={{
          popularity: 'Popularity',
          // eslint-disable-next-line
          manager_title: 'Manager\'s Title',
          // eslint-disable-next-line
          manager_name: 'Manager\'s Name',
        }}
          sortValue={[{ name: 'popularity', dir: 'desc' }]}
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
    </>
  )
}

export default FilterNoBackground
