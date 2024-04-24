import React, { useState } from 'react'
import { Dropdown, useDropdown, CircleIconButton } from '../..'

const DropdownWithHook = (props) => {
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
   <div key={selectedOption ? selectedOption.icon : "flag"}>
       <CircleIconButton
           icon={selectedOption ? selectedOption.icon : "flag"}
           onClick={() => setIsDropdownClosed(!isDropDownClosed)}
           variant="secondary"
       />
    </div>

    <Dropdown
        isClosed={isDropDownClosed}
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        triggerNone
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

export default DropdownWithHook
