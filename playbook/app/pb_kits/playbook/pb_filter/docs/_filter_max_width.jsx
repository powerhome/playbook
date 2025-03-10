import React from 'react'

import Button from '../../pb_button/_button'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'

const FilterMaxWidth = (props) => {
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
          maxWidth="sm"
          name="location"
          options={options}
      />
        <Button
            text="Apply"
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

export default FilterMaxWidth
