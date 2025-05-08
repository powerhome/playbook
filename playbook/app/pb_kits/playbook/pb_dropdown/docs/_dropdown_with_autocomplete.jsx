import React from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownWithAutocomplete = (props) => {

  const options = [
    {
      label: "United States",
      value: "United States",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "us"
    },
    {
      label: "United Kingdom",
      value: "United Kingdom",
      areaCode: "+44",
      icon: "🇬🇧", 
      id: "gb"
    },
    {
      label: "Pakistan",
      value: "Pakistan",
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
