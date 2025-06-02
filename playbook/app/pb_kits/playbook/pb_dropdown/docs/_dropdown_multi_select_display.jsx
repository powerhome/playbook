import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownMultiSelectDisplay = (props) => {

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


  return (
  <div>
    <Dropdown
        formPillProps={{size:"small", color:"neutral"}}
        multiSelect
        options={options}
        {...props}
    />
  </div>
  )
}

export default DropdownMultiSelectDisplay