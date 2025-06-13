import React, { useState } from 'react'
import Dropdown from '../../pb_dropdown/_dropdown'
import IconCircle from '../../pb_icon_circle/_icon_circle';

const DropdownWithSearch = (props) => {
const [selectedOption, setSelectedOption] = useState();

  const options = [
    {
      label: "United States",
      value: "unitedStates",
      icon: "🇺🇸",
      id: "United-states"

    },
    {
      label: "United Kingdom",
      value: "unitedKingdom",
      icon: "🇬🇧",
      id: "united-kingdom"
    },
    {
      label: "Pakistan",
      value: "pakistan",
      icon: "🇵🇰",
      id: "pakistan"
    }
  ];  


  return (
  <div>
    <Dropdown
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
      <Dropdown.Trigger>
        <div key={selectedOption ? selectedOption.icon : "flag"}>
            <IconCircle
                cursor="pointer"
                icon={selectedOption ? selectedOption.icon : "flag"}
                variant="royal"
            />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Container maxWidth="xs"
          searchbar
      >
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          />
        ))}
      </Dropdown.Container>
    </Dropdown>
  </div>
  )
}

export default  DropdownWithSearch
