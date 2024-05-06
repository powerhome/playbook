import React from 'react'
import { Dropdown, Icon, Body, FlexItem, Flex } from '../..'

const DropdownWithCustomOptions = (props) => {

  const options = [
    {
      label: "United States",
      value: "United States",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "United-states"
    },
    {
      label: "Canada",
      value: "Canada",
      areaCode: "+1",
      icon: "🇨🇦",
      id: "canada"
    },
    {
      label: "Pakistan",
      value: "Pakistan",
      areaCode: "+92",
      icon: "🇵🇰",
      id: "pakistan"
    }
  ];  


  return (
  <div>
    <Dropdown
        options={options}
        {...props}
    >
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          >
            <>
              <FlexItem>
                <Flex>
                  <Icon icon={option.icon} 
                      paddingRight="xs"
                  />
                  <Body text={option.label} />
                </Flex>
              </FlexItem>
              <FlexItem>
                <Body color="light" 
                    text={option.areaCode} 
                />
              </FlexItem>
            </>
          </Dropdown.Option>
        ))}
    </Dropdown>
  </div>
  )
}

export default  DropdownWithCustomOptions
