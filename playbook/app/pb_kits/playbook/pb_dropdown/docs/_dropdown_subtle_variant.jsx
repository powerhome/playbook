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
  <>
     <Dropdown
         options={options}
         separators={false}
         variant="subtle"
         {...props}
    />
  </>
  )
}

export default DropdownSubtleVariant
