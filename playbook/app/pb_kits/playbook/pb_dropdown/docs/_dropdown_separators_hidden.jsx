import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownSeparatorsHidden = (props) => {

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
        separators={false}
        {...props}
    />
  </div>
  )
}

export default DropdownSeparatorsHidden