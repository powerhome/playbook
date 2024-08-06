import React from 'react'
import { Dropdown } from 'playbook-ui'

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
