import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownCloseOnSelect = (props) => {

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
        closeOnSelection={false}
        label="Default"
        options={options}
        {...props}
    />
    <br />
    <Dropdown
        closeOnSelection={false}
        label="Multi Select"
        multiSelect
        options={options}
        {...props}
    />
  </div>
  )
}

export default DropdownCloseOnSelect
