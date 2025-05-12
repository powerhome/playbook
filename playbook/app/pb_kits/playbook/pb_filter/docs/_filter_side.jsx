import React from 'react'

import Filter from '../../pb_filter/_filter'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

const SortingChangeCallback = (sortOptions) => {
  alert(JSON.stringify(sortOptions[0]))
}

const FilterSide = (props) => {
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
          filters={{
            'Full Name': 'John Wick',
            'City': 'San Francisco',
          }}
          marginBottom="xl"
          minWidth="375px"
          onSortChange={SortingChangeCallback}
          results={1}
          side
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
      {() => (
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
        </form>
      )}

      </Filter>
    </>
  )
}

export default FilterSide
