import React from 'react'
import Button from '../../pb_button/_button'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FilterNoSort = (props) => {
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
        }}
        minWidth="360px"
        results={546}
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

export default FilterNoSort
