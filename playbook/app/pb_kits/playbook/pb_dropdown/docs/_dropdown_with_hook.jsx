import React, { useRef } from 'react'

import Dropdown from '../../pb_dropdown/_dropdown'
import useDropdown from '../../pb_dropdown/hooks/useDropdown'
import CircleIconButton from '../../pb_circle_icon_button/_circle_icon_button'
import FlexItem from '../../pb_flex/_flex_item'
import Icon from '../../pb_icon/_icon'
import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'

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
