import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownNoOptionsText = (props) => {

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
    <Dropdown
        autocomplete
        label="Country"
        noOptionsText="No matching countries"
        options={options}
        {...props}
    />
  )
}

export default DropdownNoOptionsText
