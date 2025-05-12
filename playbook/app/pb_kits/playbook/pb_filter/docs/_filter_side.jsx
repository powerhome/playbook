import React from 'react'

import Filter from '../../pb_filter/_filter'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

import { Collapsible, useCollapsible, Caption, SectionSeparator } from 'playbook-ui'

const SortingChangeCallback = (sortOptions) => {
  alert(JSON.stringify(sortOptions[0]))
}

const FilterSide = (props) => {
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)
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
          isCollapsed={isCollapsed}
          marginBottom="xl"
          minWidth="375px"
          onCollapse={() => setIsCollapsed(!isCollapsed)}
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
        <Collapsible
            collapsed={isCollapsed}
            iconColor='white'
            padding="none"
        >
          <Collapsible.Main padding="sm" >
              <Caption>{"Full Name"}</Caption>
          </Collapsible.Main>
          <Collapsible.Content>
            <TextInput
                placeholder="Enter name"
                {...props}
            />
          </Collapsible.Content>
        </Collapsible>
        <SectionSeparator />
        <Collapsible
            collapsed={isCollapsed}
            iconColor='white'
            padding="none"
        >
          <Collapsible.Main padding="sm" >
              <Caption>{"Territory"}</Caption>
          </Collapsible.Main>
          <Collapsible.Content>
            <Select
                blankSelection="Select One..."
                name="location"
                options={options}
                {...props}
            />
          </Collapsible.Content>
        </Collapsible>
      </Filter>
    </>
  )
}

export default FilterSide
