import React, { useState } from 'react'
import { Dropdown, useDropdown, Button } from '../../'

const DropdownWithExternalControl = (props) => {
// eslint-disable-next-line no-unused-vars
const [selectedOption, setSelectedOption] = useState();
const [isDropDownClosed, setIsDropdownClosed] = useDropdown(true);

  const options = [
    {
      label: "United States",
      value: "United States",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "United-states"
    },
    {
      label: "Canada",
      value: "Canada",
      areaCode: "+1",
      icon: "🇨🇦",
      id: "canada"
    },
    {
      label: "Pakistan",
      value: "Pakistan",
      areaCode: "+92",
      icon: "🇵🇰",
      id: "pakistan"
    }
  ];  

  return (
  <div>
    <Button
        marginBottom='sm'
        onClick={() => setIsDropdownClosed(!isDropDownClosed)}
        padding="none"
        tabIndex={0}
        variant="link"
    >
      {isDropDownClosed ? "Open Dropdown" : "Close Dropdown"}
    </Button>

    <Dropdown
        isClosed={isDropDownClosed}
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
      {options.map((option) => (
        <Dropdown.Option key={option.id} 
            option={option}
        /> 
      ))}
    </Dropdown>
  </div>
  )
}

export default DropdownWithExternalControl
