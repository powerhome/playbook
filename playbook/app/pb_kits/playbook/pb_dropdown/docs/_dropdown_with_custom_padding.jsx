import React, { useState } from 'react'
import { Dropdown } from '../..'

const DropdownWithCustomPadding = (props) => {
// eslint-disable-next-line no-unused-vars
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
