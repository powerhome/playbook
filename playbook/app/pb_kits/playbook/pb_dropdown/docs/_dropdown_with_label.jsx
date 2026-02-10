import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownDefault = (props) => {

  const options = [
    {
      label: "United States",
      value: "unitedStates",
      id: "us"
    },
    {
      label: "Canada",
      value: "canada",
      id: "ca"
    },
    {
      label: "Pakistan",
      value: "pakistan",
      id: "pk"
    }
  ];  


  return (
  <div>
    <Dropdown
        id="select_a_country"
        label="Select a Country"
        options={options}
        {...props}
    >
      {options.map((option) => (
        <Dropdown.Option key={option.id} 
            option={option}
        /> 
      ))}
    </Dropdown>
  </div>
  )
}

export default DropdownDefault
