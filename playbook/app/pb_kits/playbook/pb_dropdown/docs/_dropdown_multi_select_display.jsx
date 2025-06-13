import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownMultiSelectDisplay = (props) => {

  const options = [
    {
      label: "United States",
      value: "unitedStates",
      id: "us"
    },
    {
      label: "United Kingdom",
      value: "unitedKingdom",
      id: "gb"
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
    },
    {
      label: "India",
      value: "india",
      id: "in"
    },
    {
      label: "Australia",
      value: "australia",
      id: "au"
    },
    {
      label: "New Zealand",
      value: "new Zealand",
      id: "nz"
    },
    {
      label: "Italy",
      value: "italy",
      id: "it"
    },
    {
      label: "Spain",
      value: "spain",
      id: "es"
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