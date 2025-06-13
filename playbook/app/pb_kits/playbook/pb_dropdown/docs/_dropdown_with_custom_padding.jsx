import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownWithCustomPadding = (props) => {

  const options = [
    {
      label: "United States",
      value: "unitedStates",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "United-states"
    },
    {
      label: "Canada",
      value: "canada",
      areaCode: "+1",
      icon: "🇨🇦",
      id: "canada"
    },
    {
      label: "Pakistan",
      value: "pakistan",
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
            padding="sm"
        /> 
      ))}
    </Dropdown>
  </div>
  )
}

export default DropdownWithCustomPadding
