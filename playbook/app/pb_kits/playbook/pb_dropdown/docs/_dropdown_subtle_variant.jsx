import React from 'react'
import { Dropdown } from 'playbook-ui'

const DropdownSubtleVariant = (props) => {

  const options = [
    {
      label: "United States",
      value: "United States",
    },
    {
      label: "Canada",
      value: "Canada",
    },
    {
      label: "Pakistan",
      value: "Pakistan",
    }
  ];  


  return (
  <>
    <Dropdown
        options={options}
        separators={false}
        variant="subtle"
        {...props}
    >
      <Dropdown.Trigger/>
      <Dropdown.Container>
        {options.map((option) => (
          <Dropdown.Option 
              borderRadius="md"
              key={option.id} 
              marginX="xs"
              marginY="xxs"
              option={option}
              paddingX="xs"
              paddingY="xxs"
          />
        ))}
      </Dropdown.Container>
    </Dropdown>
  </>
  )
}

export default DropdownSubtleVariant
