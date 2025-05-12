import React, { useState } from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownMultiSelect = (props) => {

  const [selectedOption, setSelectedOption] = useState();

  const options = [
    {
      label: "United States",
      value: "United States",
    },
    {
        label: "United Kingdom",
        value: "United Kingdom",
    },  
    {
      label: "Canada",
      value: "Canada",
    },
    {
      label: "Pakistan",
      value: "Pakistan",
    },
    {
      label: "India",
      value: "India",
    },
    {
      label: "Australia",
      value: "Australia",
    },
    {
      label: "New Zealand",
      value: "New Zealand",
    },
    {
      label: "Italy",
      value: "Italy",
    },
    {
      label: "Spain",
      value: "Spain",
    }
  ];  

  console.log('selectedOption', selectedOption)

  return (
  <div>
    <Dropdown
        multiSelect
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    />
  </div>
  )
}

export default DropdownMultiSelect