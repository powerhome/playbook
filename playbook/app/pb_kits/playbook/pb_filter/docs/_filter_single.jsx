import React from 'react'

import Filter from '../_filter'

import Button from '../../pb_button/_button'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FilterSingle = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A Galaxy Far Far Away Like Really Far Away' },
  ]
  return (
    <Filter
        filters={{
          'Full Name': 'John Wick',
        }}
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
  )
}

export default FilterSingle
