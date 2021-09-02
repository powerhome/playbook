import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const SortingChangeCallback = (sortOptions) => {
  alert(JSON.stringify(sortOptions[0]))
}

const FilterDefault = (props) => {
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
          onSortChange={SortingChangeCallback}
          results={1}
          sortOptions={{
            popularity: 'Popularity',
            // eslint-disable-next-line
            manager_title: 'Manager\'s Title',
            // eslint-disable-next-line
            manager_name: 'Manager\'s Name',
          }}
          sortValue={[{ name: 'popularity', dir: 'desc' }]}
          {...props}
      >
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
              text="Apply"
              {...props}
          />
          <Button
              text="Clear"
              variant="secondary"
              {...props}
          />
        </Flex>
      </Filter>

      <br />

      <Filter
          double
          onSortChange={SortingChangeCallback}
          results={1}
          sortOptions={{
            popularity: 'Popularity',
            // eslint-disable-next-line
            manager_title: 'Manager\'s Title',
            // eslint-disable-next-line
            manager_name: 'Manager\'s Name',
          }}
          sortValue={[{ name: 'popularity', dir: 'desc' }]}
          {...props}
      >
        <TextInput
            label="Example Text Field"
            placeholder="Enter Text"
            {...props}
        />

        <Select
            blankSelection="Select One..."
            label="Example Collection Select"
            name="Collection Select"
            options={options}
            {...props}
        />
        <Flex
            spacing="between"
            {...props}
        >
          <Button
              text="Apply"
              {...props}
          />
          <Button
              text="Clear"
              variant="secondary"
              {...props}
          />
        </Flex>
      </Filter>
    </>
  )
}

export default FilterDefault
