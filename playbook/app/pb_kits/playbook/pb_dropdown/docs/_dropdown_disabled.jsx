import React from 'react'
import Dropdown from '../_dropdown'

const DropdownDisabled = (props) => {

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
        disabled
        label="Default Dropdown"
        options={options}
        {...props}
    />
  </div>
  )
}

export default DropdownDisabled
