import React from 'react'
import { Dropdown } from '../../'

const DropdownBlankSelection = (props) => {
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
        blankSelection="Select one..."
        options={options}
        {...props}
    />
  </>
  )
}

export default DropdownBlankSelection
