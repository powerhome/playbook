import React, { useState } from 'react'
import { Dropdown, User, FlexItem, Badge, Avatar } from '../../'

const DropdownWithCustomDisplay = (props) => {
  const [selectedOption, setSelectedOption] = useState();

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
      title: "Senior UX Desinger",
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

  const customDisplay = () => {
    return (
      <>
      {
        selectedOption && (
            <Avatar
                name={selectedOption.label}
                size="sm"
            />
        )
      }
    </>
    )
  };


  return (
  <div>
    <Dropdown
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
      <Dropdown.Trigger customDisplay={customDisplay()}/>
      <Dropdown.Container search>
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
      </Dropdown.Container>
    </Dropdown>
  </div>
  )
}

export default DropdownWithCustomDisplay