import React from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'
import Badge from '../../pb_badge/_badge'
import FlexItem from '../../pb_flex/_flex_item'
import User from '../../pb_user/_user'

const DropdownWithAutocomplete = (props) => {

  const options = [
    {
      label: "Jasper Furniss",
      value: "Jasper Furniss",
      territory: "PHL",
      title: "Senior UX Engineer",
      id: "jasper-furniss",
      status: "Offline"
    },
    {
      label: "Ramon Ruiz",
      value: "Ramon Ruiz",
      territory: "PHL",
      title: "Senior UX Designer",
      id: "ramon-ruiz",
      status: "Away"
    },
    {
      label: "Jason Cypret",
      value: "Jason Cypret",
      territory: "PHL",
      title: "VP of User Experience",
      id: "jason-cypret",
      status: "Online"
    },
    {
      label: "Courtney Long",
      value: "Courtney Long",
      territory: "PHL",
      title: "UX Design Mentor",
      id: "courtney-long",
      status: "Online"
    }
  ];


  return (
  <div>
    <Dropdown autocomplete
        options={options}
        {...props}
    >
        {options.map((option) => (
          <Dropdown.Option key={option.id} 
              option={option}
          >
            <>
              <FlexItem>
                <User
                    align="left"
                    avatar
                    name={option.label}
                    orientation="horizontal"
                    territory={option.territory}
                    title={option.title}
                />
              </FlexItem>
              <FlexItem>
                <Badge
                    rounded
                    text={option.status}
                    variant={`${
                        option.status === "Offline"
                        ? "neutral"
                        : option.status === "Online"
                        ? "success"
                        : "warning"
                    }`}
                />
              </FlexItem>
            </>
          </Dropdown.Option>
        ))}
    </Dropdown>
  </div>
  )
}

export default  DropdownWithAutocomplete
