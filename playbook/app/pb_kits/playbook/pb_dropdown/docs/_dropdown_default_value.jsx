import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownDefaultValue = (props) => {
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
  <>
    <Dropdown
        defaultValue={options[2]}
        options={options}
        {...props}
    />
  </>
  )
}

export default DropdownDefaultValue
