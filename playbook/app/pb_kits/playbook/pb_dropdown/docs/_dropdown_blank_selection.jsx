import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownBlankSelection = (props) => {
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
  <>
    <Dropdown
        blankSelection="Select one..."
        options={options}
        {...props}
    />
  </>
  )
}

export default DropdownBlankSelection
