import React from 'react'

import Button from '../../pb_button/_button'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const SortingChangeCallback = (sortOptions) => {
  alert(JSON.stringify(sortOptions[0]))
}

const FilterDefault = (props) => {
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
          double
          filters={{
            'Full Name': 'John Wick',
            'City': 'San Francisco',
          }}
          marginBottom="xl"
          minWidth="375px"
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
              maxWidth="sm"
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
          double
          minWidth="375px"
          onSortChange={SortingChangeCallback}
          results={0}
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

export default FilterDefault
