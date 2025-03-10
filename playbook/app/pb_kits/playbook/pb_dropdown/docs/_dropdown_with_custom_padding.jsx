import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownWithCustomPadding = (props) => {

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
            padding="sm"
        /> 
      ))}
    </Dropdown>
  </div>
  )
}

export default DropdownWithCustomPadding
