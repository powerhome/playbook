import React, { useState } from 'react'
import { Dropdown, User, Flex, FlexItem, Badge, Avatar } from '../../'

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
    <Dropdown
        onSelect={(selectedItem) => setSelectedOption(selectedItem)}
        options={options}
        {...props}
    >
      <Dropdown.Trigger customDisplay={<CustomDisplay/>}
          placeholder="Select a User"
      />
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
                <Badge dark
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

export default DropdownWithCustomDisplay
