import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownSeparatorsHidden = (props) => {

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
        separators={false}
        {...props}
    />
  </div>
  )
}

export default DropdownSeparatorsHidden