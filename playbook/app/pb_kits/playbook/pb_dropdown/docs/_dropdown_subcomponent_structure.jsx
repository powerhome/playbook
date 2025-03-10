import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownSubcomponentStructure = (props) => {


  const options = [
    {
      label: "United States",
      value: "United States",
    },
    {
      label: "Canada",
      value: "Canada",
    },
    {
      label: "Pakistan",
      value: "Pakistan",
    }
  ];  


  return (
  <div>
    <Dropdown
        options={options}
        {...props}
    >
      <Dropdown.Trigger/>
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

export default  DropdownSubcomponentStructure
