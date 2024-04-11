import React, { useState } from 'react'
import { Dropdown } from '../../'

const DropdownDefault = (props) => {
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
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
      <Dropdown.Container>
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          /> 
        ))}
      </Dropdown.Container>
    </Dropdown>
  </div>
  )
}

export default DropdownDefault
