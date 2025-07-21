import React from 'react'
import Dropdown from '../_dropdown'

const DropdownCustomActiveStyleOptions = (props) => {


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
  <div>
    <Dropdown
        activeStyle={{
          backgroundColor: "bg_light",
          fontColor: "primary",
        }}
        label="Background Color: bg_light; Font Color: primary"
        marginBottom="sm"
        options={options}
        {...props}
    >
      <Dropdown.Trigger/>
      <Dropdown.Container>
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          />
        ))}
      </Dropdown.Container>
    </Dropdown>
    <Dropdown
        activeStyle={{
          backgroundColor: "white",
          fontColor: "primary",
        }}
        label="Background Color: white; Font Color: primary"
        marginBottom="sm"
        options={options}
        {...props}
    />
    <Dropdown
        activeStyle={{
          backgroundColor: "bg_light",
          fontColor: "text_lt_default",
        }}
        autocomplete
        label="Background Color: bg_light; Font Color: text_lt_default"
        marginBottom="sm"
        options={options}
        {...props}
    />
    <Dropdown
        activeStyle={{
          fontColor: "text_lt_lighter",
        }}
        label="Font Color: text_lt_lighter"
        marginBottom="sm"
        options={options}
        {...props}
    >
      <Dropdown.Trigger/>
      <Dropdown.Container>
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

export default  DropdownCustomActiveStyleOptions
