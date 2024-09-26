import React from 'react'
import { Dropdown } from 'playbook-ui'

const DropdownSubtleVariant = (props) => {

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
        variant="subtle"
        {...props}
    />
  </div>
  )
}

export default DropdownSubtleVariant
