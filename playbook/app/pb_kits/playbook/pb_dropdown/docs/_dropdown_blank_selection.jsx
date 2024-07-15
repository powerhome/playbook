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
  
  const onChange = (value) => {
    console.log(value)
  }

  return (
  <>
    <Dropdown
        blankSelection="Select one..."
        onSelect={onChange}
        options={options}
        {...props}
    />
  </>
  )
}

export default DropdownBlankSelection
