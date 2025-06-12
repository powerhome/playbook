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
        options={options}
        {...props}
    />
  </div>
  )
}

export default DropdownDefault
