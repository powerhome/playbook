import React, { useState } from 'react'

import Filter from '../../pb_filter/_filter'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

import { useCollapsible, SectionSeparator, Checkbox, Button } from 'playbook-ui'

const SortingChangeCallback = (sortOptions) => {
  alert(JSON.stringify(sortOptions[0]))
}

const FilterSidebar = (props) => {
  const [name, setName] = useState('')
  const handleUpdateName = ({ target }) => {
    setName(target.value)
  }
  const [isCollapsed, setIsCollapsed] = useCollapsible(true)
  const [isProductsCollapsed, setIsProductsCollapsed] = useCollapsible(true)
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
            'Products': ['Doors'],
          }}
          isCollapsed={isCollapsed}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          onSortChange={SortingChangeCallback}
          results={116}
          sidebar
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
        <Filter.Section
            collapsed={isCollapsed}
            collapsible
            header
            headerText="Full Name"
        >
          <TextInput
              onChange={handleUpdateName}
              placeholder="Enter name"
              value={name}
              {...props}
          />
        </Filter.Section>
        <SectionSeparator />
        <Filter.Section
            collapsed={isCollapsed}
            collapsible
            header
            headerText="Territory"
        >
          <Select
              blankSelection="Select One..."
              name="location"
              options={options}
              {...props}
          />
        </Filter.Section>
        <SectionSeparator />
        <Filter.Section
            collapsed={isCollapsed}
            collapsible
            header
            headerText="Products"
        >
          <div>
            <Checkbox
                marginBottom="sm"
                text="Doors"
            />
          </div>
          <div>
            <Checkbox
                marginBottom="sm"
                text="Windows"
            />
          </div>
          <div>
            <Checkbox
                marginBottom="sm"
                text="Siding"
            />
          </div>
          {!isProductsCollapsed &&
            <>
              <div>
                <Checkbox
                    marginBottom="sm"
                    text="Roofing"
                />
              </div>
              <div>
                <Checkbox
                    marginBottom="sm"
                    text="Gutters"
                />
              </div>
              <div>
                <Checkbox
                    marginBottom="sm"
                    text="Solar"
                />
              </div>
              <div>
                <Checkbox
                    marginBottom="sm"
                    text="Insulation"
                />
              </div>
            </>
          }
          <Button
              icon={isProductsCollapsed ? "chevron-down" : "chevron-up"}
              iconRight
              onClick={() => setIsProductsCollapsed(!isProductsCollapsed)}
              padding="none"
              text={isProductsCollapsed ? "Show More" : "Show Less"}
              variant="link"
          />
        </Filter.Section>
      </Filter>
    </>
  )
}

export default FilterSidebar
