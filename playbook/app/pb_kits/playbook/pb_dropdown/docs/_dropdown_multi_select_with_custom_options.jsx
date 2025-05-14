import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'
import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import Icon from '../../pb_icon/_icon'

const DropdownMultiSelectWithCustomOptions = (props) => {

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
    },
    {
      label: "India",
      value: "India",
      areaCode: "+91",
      icon: "🇮🇳",
      id: "india"
    },
    {
      label: "Australia",
      value: "Australia",
      areaCode: "+61",
      icon: "🇦🇺",
      id: "australia"
    },
    {
      label: "New Zealand",
      value: "New Zealand",
      areaCode: "+64",
      icon: "🇳🇿",
      id: "new-zealand"
    },
    {
      label: "Italy",
      value: "Italy",
      areaCode: "+39",
      icon: "🇮🇹",
      id: "italy"
    },
    {
      label: "Spain",
      value: "Spain",
      areaCode: "+34",
      icon: "🇪🇸",
      id: "spain"
    }
  ];  

  return (
  <div>
    <Dropdown
        multiSelect
        options={options}
        {...props}
    >
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
    </Dropdown>
  </div>
  )
}

export default DropdownMultiSelectWithCustomOptions