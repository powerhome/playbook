import React from 'react'

import Dropdown from '../_dropdown'
import Badge from '../../pb_badge/_badge'
import Flex from '../../pb_flex/_flex'
import FlexItem from '../../pb_flex/_flex_item'
import User from '../../pb_user/_user'


const DropdownWithAutocompleteWithSubcomponents = (props) => {
  const options = [
    {
      label: "Jasper Furniss",
      value: "jasperFurniss",
      territory: "PHL",
      title: "Lead UX Engineer",
      id: "jasper-furniss",
      status: "Offline"
    },
    {
      label: "Ramon Ruiz",
      value: "ramonRuiz",
      territory: "PHL",
      title: "Senior UX Designer",
      id: "ramon-ruiz",
      status: "Away"
    },
    {
      label: "Carlos Lima",
      value: "carlosLima",
      territory: "PHL",
      title: "Nitro Developer",
      id: "carlos-lima",
      status: "Online"
    },
    {
      label: "Courtney Long",
      value: "courtneyLong",
      territory: "PHL",
      title: "Lead UX Designer",
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
            <Flex
                align="center"
                justify="between"
            >
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
                    dark
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
            </Flex>
          </Dropdown.Option>
        ))}
    </Dropdown>
  </div>
  )
}

export default  DropdownWithAutocompleteWithSubcomponents
