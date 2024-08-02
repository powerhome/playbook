import React, { useState } from 'react'
import { Dropdown, Icon, Body, FlexItem, Flex, IconCircle } from 'playbook-ui'

const DropdownWithCustomTrigger = (props) => {

const [selectedOption, setSelectedOption] = useState();

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
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
        <Dropdown.Trigger>
            <div key={selectedOption ? selectedOption.icon : "flag"}>
                <IconCircle
                    cursor="pointer"
                    icon={selectedOption ? selectedOption.icon : "flag"}
                    variant="royal"
                />
            </div>
        </Dropdown.Trigger>
      <Dropdown.Container maxWidth="xs">
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          >
            <Flex
                align="center"
                justify="between"
            >
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
            </Flex>
          </Dropdown.Option>
        ))}
      </Dropdown.Container>
    </Dropdown>
  </div>
  )
}

export default  DropdownWithCustomTrigger
