import React from 'react'
import Dropdown from '../_dropdown'

import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'
import Icon from '../../pb_icon/_icon'

const DropdownCustomIconOptions = (props) => {

  const options = [
    { label: "Item 1", value: "item-1", id: "1" },
    { label: "Item 2", value: "item-2", id: "2" },
    { label: "Item 3", value: "item-3", id: "3" },
  ]


  return (
  <div>
      <Dropdown label="Multiple Icons"
          options={options}
          {...props}
      >
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          >
            <Flex align="center" 
                justify="between"
            >
                <Flex align="center">
                  <Icon icon="calendar" 
                      paddingRight="xs"
                      {...props}    
                  />
                  <Body color="default" 
                      text={option.label}
                      {...props}
                  />
                </Flex>
                <Icon icon="check" 
                    {...props}    
                />
            </Flex>
          </Dropdown.Option>
        ))}
      </Dropdown>

      <Dropdown label="Icon on Left"
          options={options} 
          paddingY="md"
          {...props}
      >
        {options.map((option) => (
          <Dropdown.Option key={option.id}
              option={option}
          >
            <Flex align="center">
              <Icon icon="calendar" 
                  paddingRight="xs"
                  {...props}
              />
              <Body color="default" 
                  text={option.label}
                  {...props}
              />
            </Flex>
          </Dropdown.Option>
        ))}
      </Dropdown>

      <Dropdown label="Icon on Right"
          options={options}
          {...props}
      >
        {options.map((option) => (
          <Dropdown.Option key={option.id}
              option={option}
          >
            <Flex align="center"
                justify="between"
            >
              <Flex align="center">
                <Body color="default" 
                    text={option.label}
                    {...props}
                />
              </Flex>
              <Icon icon="check"
                  {...props}
              />
            </Flex>
          </Dropdown.Option>
        ))}
      </Dropdown>
  </div>
  )
}

export default  DropdownCustomIconOptions
