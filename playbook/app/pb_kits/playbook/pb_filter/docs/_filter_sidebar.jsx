import React, { useState } from 'react'

import Filter from '../../pb_filter/_filter'
import Select from '../../pb_select/_select'
import TextInput from '../../pb_text_input/_text_input'

import { useCollapsible, SectionSeparator, Checkbox, Flex, Table, Caption, Icon } from 'playbook-ui'

const people = [
  { name: 'Hera Syndulla', territory: 'A galaxy far far away, like really far away...', products: ['Insulation'] },
  { name: 'Kanan Jarrus', territory: 'USA', products: ['Siding', 'Roofing', 'Gutters'] },
  { name: 'C1-10P', territory: 'USA', products: ['Roofing'] },
  { name: 'Anakin Skywalker', territory: 'A galaxy far far away, like really far away...', products: ['Doors', 'Windows', 'Solar'] },
  { name: 'Leia Organa', territory: 'Canada', products: ['Windows', 'Doors'] },
  { name: 'Luke Skywalker', territory: 'Brazil', products: ['Solar', 'Roofing'] },
  { name: 'Padmé Amidala', territory: 'Philippines', products: ['Siding', 'Gutters'] },
  { name: 'Obi-Wan Kenobi', territory: 'USA', products: ['Windows', 'Siding'] },
  { name: 'Ahsoka Tano', territory: 'Canada', products: ['Insulation', 'Solar'] },
  { name: 'Boba Fett', territory: 'Brazil', products: ['Roofing', 'Gutters'] },
  { name: 'Mace Windu', territory: 'Philippines', products: ['Doors', 'Siding'] },
  { name: 'Grogu', territory: 'A galaxy far far away, like really far away...', products: ['Insulation'] },
  { name: 'Sabine Wren', territory: 'Canada', products: ['Solar', 'Doors'] },
  { name: 'C-3PO', territory: 'Brazil', products: ['Windows'] },
  { name: 'R2-D2', territory: 'Philippines', products: ['Doors', 'Gutters'] },
]

const FilterSidebar = (props) => {
  const [name, setName] = useState('')
  const [ territory, setTerritory ] = useState('')
  const [ products, setProducts ] = useState({})
  const handleUpdateName = ({ target }) => {
    setName(target.value)
  }
  const handleUpdateTerritory = ({ target }) => {
    setTerritory(target.value)
  }
  const handleCheckboxChange = ({ target }) => {
    setProducts(prev => ({
      ...prev,
      [target.name]: !prev[target.name],
    }))
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

  const filteredPeople = people.filter((person) => {
    const matchesName = person.name.toLowerCase().includes(name.toLowerCase())

    const matchesTerritory = territory === '' ? true : person.territory === territory

    const matchesProducts = Object.values(products).every((product) => !product) ? true : person.products.some(product => products[product])

    return matchesName && matchesTerritory && matchesProducts
  })

  return (
    <>
      <Flex>
        <Filter
            isCollapsed={isCollapsed}
            marginRight="xs"
            onCollapse={() => setIsCollapsed(!isCollapsed)}
            results={filteredPeople.length}
            sortOptions={{
              popularity: 'Popularity',
              // eslint-disable-next-line
              manager_title: 'Manager\'s Title',
              // eslint-disable-next-line
              manager_name: 'Manager\'s Name',
            }}
            sortValue={[{ name: 'popularity', dir: 'desc' }]}
            variant="sidebar"
            width="xs"
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
                onChange={handleUpdateTerritory}
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
                  name="Doors"
                  onChange={handleCheckboxChange}
                  text="Doors"
              />
            </div>
            <div>
              <Checkbox
                  marginBottom="sm"
                  name="Windows"
                  onChange={handleCheckboxChange}
                  text="Windows"
              />
            </div>
            <div>
              <Checkbox
                  marginBottom="sm"
                  name="Siding"
                  onChange={handleCheckboxChange}
                  text="Siding"
              />
            </div>
            {!isProductsCollapsed &&
              <>
                <div>
                  <Checkbox
                      checked={products["Roofing"]}
                      marginBottom="sm"
                      name="Roofing"
                      onChange={handleCheckboxChange}
                      text="Roofing"
                  />
                </div>
                <div>
                  <Checkbox
                      checked={products["Gutters"]}
                      marginBottom="sm"
                      name="Gutters"
                      onChange={handleCheckboxChange}
                      text="Gutters"
                  />
                </div>
                <div>
                  <Checkbox
                      checked={products["Solar"]}
                      marginBottom="sm"
                      name="Solar"
                      onChange={handleCheckboxChange}
                      text="Solar"
                  />
                </div>
                <div>
                  <Checkbox
                      checked={products["Insulation"]}
                      marginBottom="sm"
                      name="Insulation"
                      onChange={handleCheckboxChange}
                      text="Insulation"
                  />
                </div>
              </>
            }
            <div onClick={() => setIsProductsCollapsed(!isProductsCollapsed)}>
              <Flex
                  cursor="pointer"
                  marginBottom="sm"
              >
                <Caption
                    color="link"
                    marginRight="xxs"
                    size="xs"
                    text={isProductsCollapsed ? "Show More" : "Show Less"}
                />
                <Icon
                    icon={isProductsCollapsed ? "chevron-down" : "chevron-up"}
                />
              </Flex>
            </div>
          </Filter.Section>
        </Filter>
        <Table
            size="sm"
        >
          <thead>
            <tr>
              <th>{'Name'}</th>
              <th>{'Territory'}</th>
              <th>{'Products'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeople.map((person) => (<tr key={person.name}>
              <td>{ person.name }</td>
              <td>{ person.territory }</td>
              <td>{ person.products.join(", ") }</td>
            </tr>))}
          </tbody>
        </Table>
      </Flex>
    </>
  )
}

export default FilterSidebar
