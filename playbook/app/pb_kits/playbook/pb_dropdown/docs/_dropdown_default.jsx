import React from 'react'
import { Dropdown, Icon, Body, FlexItem, Flex } from '../../'

const DropdownDefault = (props) => {

  const options = [
    {
      label: "United States",
      value: "United States",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "United-states"
    },
    {
      label: "Ukraine",
      value: "Ukraine",
      areaCode: "+380",
      icon: "🇺🇦",
      id: "ukraine"
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
        onSelect={(selectedItem) => console.log(selectedItem)}
        options={options}
        {...props}
    >
      <Dropdown.Trigger/>
      <Dropdown.Container search>
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
      </Dropdown.Container>
    </Dropdown>
  </div>
  )
}

export default DropdownDefault