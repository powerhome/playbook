import React from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownWithAutocomplete = (props) => {

  const options = [
    {
      label: "United States",
      value: "unitedStates",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "us"
    },
    {
      label: "United Kingdom",
      value: "unitedKingdom",
      areaCode: "+44",
      icon: "🇬🇧", 
      id: "gb"
    },
    {
      label: "Pakistan",
      value: "pakistan",
      areaCode: "+92",
      icon: "🇵🇰",
      id: "pk"
    }
  ]

  return (
  <div>
    <Dropdown autocomplete
        options={options}
        {...props}
    /> 
  </div>
  )
}

export default  DropdownWithAutocomplete
