import React from 'react'
import Button from '../../pb_button/_button'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FilterPopoverProps = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away, like really far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far far away...' },
  ]

  const popoverProps = {
    width: "250px"
  }

  return (
    <Filter
        {...props}
        double
        filters={{
          'Full Name': 'John Wick',
          'City': 'San Francisco',
        }}
        popoverProps={popoverProps}
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
  )
}

export default FilterPopoverProps
