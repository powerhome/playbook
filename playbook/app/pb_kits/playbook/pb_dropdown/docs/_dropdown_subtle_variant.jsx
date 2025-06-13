import React from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'

const DropdownSubtleVariant = (props) => {

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
         options={options}
         separators={false}
         variant="subtle"
         {...props}
    />
  </>
  )
}

export default DropdownSubtleVariant
