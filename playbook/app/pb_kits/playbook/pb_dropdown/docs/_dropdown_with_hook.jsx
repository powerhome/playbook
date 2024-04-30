import React, { useRef } from 'react'
import { Dropdown, useDropdown, CircleIconButton, Icon, Body, FlexItem, Flex  } from '../..'

const DropdownWithHook = (props) => {
const [isDropDownClosed, setIsDropdownClosed] = useDropdown(true);
const buttonRef = useRef(null);

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
      <CircleIconButton
          htmlOptions={{ref: buttonRef}}
          icon={"flag"}
          onClick={() => setIsDropdownClosed(!isDropDownClosed)}
          variant="secondary"
      />
    <Dropdown
        isClosed={isDropDownClosed}
        options={options}
        triggerRef={buttonRef}
        {...props}
    >
      {options.map((option) => (
        <Dropdown.Option key={option.id} 
            option={option}
        > 
        <>
          <FlexItem>
              <Flex paddingRight='md'>
                <Icon icon={option.icon} 
                    paddingRight="xs"
                />
                <Body text={option.label} />
              </Flex>
          </FlexItem>
              <FlexItem>
                <Body color="light" 
                    text={option.areaCode} 
                />
              </FlexItem>
            </>
        </Dropdown.Option>
      ))}
    </Dropdown>
  </div>
  )
}

export default DropdownWithHook
