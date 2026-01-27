import React, { useState } from 'react'

import Button from '../../pb_button/_button'
import Filter from '../../pb_filter/_filter'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FilterDefault = (props) => {
  const [sortValue, setSortValue] = useState([{ name: 'popularity', dir: 'desc' }])
  const [sortValue2, setSortValue2] = useState([{ name: 'popularity', dir: 'desc' }])

  const handleSortChange = (sortOptions) => {
    setSortValue(sortOptions)
    alert(JSON.stringify(sortOptions[0]))
  }

  const handleSortChange2 = (sortOptions) => {
    setSortValue2(sortOptions)
  }
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
          onSortChange={handleSortChange}
          results={1}
          sortOptions={{
            popularity: 'Popularity',
            // eslint-disable-next-line
            manager_title: 'Manager\'s Title',
            // eslint-disable-next-line
            manager_name: 'Manager\'s Name',
          }}
          sortValue={sortValue}
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
          onSortChange={handleSortChange2}
          results={0}
          sortOptions={{
            popularity: 'Popularity',
            // eslint-disable-next-line
            manager_title: 'Manager\'s Title',
            // eslint-disable-next-line
            manager_name: 'Manager\'s Name',
          }}
          sortValue={sortValue2}
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
