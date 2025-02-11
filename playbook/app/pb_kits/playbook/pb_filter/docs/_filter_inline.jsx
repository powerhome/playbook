import React from 'react'

import Filter from '../_filter'

import Button from '../../pb_button/_button'
import Flex from '../../pb_flex/_flex'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const FilterInline = (props) => {
  const options = [
    { value: 'USA' },
    { value: 'Canada' },
    { value: 'Brazil' },
    { value: 'Philippines' },
    { value: 'A galaxy far far away...' },
  ]
  return (
    <>
      <Filter
          filters={{
            'Full Name': 'John Wick',
          }}
          marginBottom="xl"
          minWidth="360px"
          results={546}
          sortOptions={{
            popularity: 'Popularity',
            // eslint-disable-next-line
            manager_title: 'Manager\'s Title',
            // eslint-disable-next-line
            manager_name: 'Manager\'s Name',
          }}
          sortValue={[{ name: 'popularity', dir: 'desc' }]}
          variant="inline"
          {...props}
      >
        <form>
          <Filter.Inputs>
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
                  marginRight="xs"
                  text="Apply"
                  {...props}
              />
              <Button
                  text="Clear"
                  variant="secondary"
                  {...props}
              />
            </Flex>
          </Filter.Inputs>
        </form>
      </Filter>

      <Filter
          double
          filters={{
            'Full Name': 'John Wick',
          }}
          minWidth="360px"
          results={546}
          sortOptions={{
            popularity: 'Popularity',
            // eslint-disable-next-line
            manager_title: 'Manager\'s Title',
            // eslint-disable-next-line
            manager_name: 'Manager\'s Name',
          }}
          sortValue={[{ name: 'popularity', dir: 'desc' }]}
          variant="inline"
          {...props}
      >
        <form>
          <Filter.Inputs>
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
                  marginRight="xs"
                  text="Apply"
                  {...props}
              />
              <Button
                  text="Clear"
                  variant="secondary"
                  {...props}
              />
            </Flex>
          </Filter.Inputs>
        </form>
      </Filter>
    </>
  )
}

export default FilterInline
