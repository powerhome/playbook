import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const FilterDefault = () => {
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
          double
          filters={{
            'Full Name': 'John Wick',
            'City': 'San Francisco',
          }}
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

      <br />

      <Filter
          double
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
        <TextInput
            label="Example Text Field"
            placeholder="Enter Text"
        />

        <Select
            blankSelection="Select One..."
            label="Example Collection Select"
            name="Collection Select"
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

export default FilterDefault
