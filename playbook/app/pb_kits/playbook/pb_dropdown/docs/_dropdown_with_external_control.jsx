import React from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'
import useDropdown from '../../pb_dropdown/hooks/useDropdown'

import Button from '../../pb_button/_button'

const DropdownWithExternalControl = (props) => {
const [isDropDownClosed, setIsDropdownClosed] = useDropdown(true);

  const options = [
    {
      label: "United States",
      value: "unitedStates",
      areaCode: "+1",
      icon: "🇺🇸",
      id: "United-states"
    },
    {
      label: "Canada",
      value: "canada",
      areaCode: "+1",
      icon: "🇨🇦",
      id: "canada"
    },
    {
      label: "Pakistan",
      value: "pakistan",
      areaCode: "+92",
      icon: "🇵🇰",
      id: "pakistan"
    }
  ];  

  return (
  <div>
    <Button
        data={{dropdown:'pb-dropdown-trigger'}}
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
