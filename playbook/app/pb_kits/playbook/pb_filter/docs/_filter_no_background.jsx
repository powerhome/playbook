import React from 'react'
import { Button, Filter, Flex, Select, TextInput } from '../../'

const FilterNoBackground = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away, like really far away...' },
  ]
  return (
    <>
      <Filter
          background={false}
          filters={{
          'Full Name': 'John Wick',
          'City': 'Las Vegas',
        }}
          minWidth="375px"
          results={3}
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

      <Filter
          background={false}
          double
          filters={{
          'Full Name': 'John Wick',
          'City': 'Las Vegas',
        }}
          minWidth="375px"
          results={3}
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
    </>
  )
}

export default FilterNoBackground
