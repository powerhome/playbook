import React from 'react'

import Filter from '../_filter'

import Button from '../../pb_button/_button'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FilterResponsive = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away...' },
  ]

  return (
    <Filter
        filters={{
          'Full Name': 'John Wick',
          'City': 'San Francisco',
          'Territory': 'Pacific Northwest',
          'Status': 'Active',
          'Role': 'Manager',
        }}
        minWidth="360px"
        responsive="stacked"
        results={546}
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
  )
}

export default FilterResponsive
