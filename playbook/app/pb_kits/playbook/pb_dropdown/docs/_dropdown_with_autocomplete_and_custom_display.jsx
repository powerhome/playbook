import React, { useState } from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'
import Badge from '../../pb_badge/_badge'
import FlexItem from '../../pb_flex/_flex_item'
import Avatar from '../../pb_avatar/_avatar'
import User from '../../pb_user/_user'


const DropdownWithAutocompleteAndCustomDisplay = (props) => {
  const [selectedOption, setSelectedOption] = useState();

  const options = [
    {
      label: "Jasper Furniss",
      value: "Jasper Furniss",
      territory: "PHL",
      title: "Lead UX Engineer",
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
      label: "Carlos Lima",
      value: "Carlos Lima",
      territory: "PHL",
      title: "Nitro Developer",
      id: "carlos-lima",
      status: "Online"
    },
    {
      label: "Courtney Long",
      value: "Courtney Long",
      territory: "PHL",
      title: "Lead UX Designer",
      id: "courtney-long",
      status: "Online"
    }
  ];

  const CustomDisplay = () => {
    return (
      <>
      {
        selectedOption && (
            <Avatar
                name={selectedOption.label}
                size="xs"
            />
        )
      }
    </>
    )
  };

  return (
  <div>
    <Dropdown autocomplete
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
        <Dropdown.Trigger customDisplay={<CustomDisplay/>} />
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

export default  DropdownWithAutocompleteAndCustomDisplay
