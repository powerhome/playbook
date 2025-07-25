import React, { useState } from 'react'
import Dropdown from '../_dropdown'

import Body from '../../pb_body/_body'
import Flex from '../../pb_flex/_flex'
import Radio from '../../pb_radio/_radio'

const DropdownCustomRadioOptions = (props) => {
  const [selectedValue, setSelectedValue] = useState(null)

  const options = [
    { label: "Item 1", value: "item-1", id: "1" },
    { label: "Item 2", value: "item-2", id: "2" },
    { label: "Item 3", value: "item-3", id: "3" },
  ]


  return (
  <div>
      <Dropdown
          activeStyle={{ backgroundColor: "bg_light", fontColor: "text_lt_default" }}
          label="Select Item"
          onSelect={(selectedItem) => setSelectedValue(selectedItem?.value)}
          options={options}
          {...props}
      >
        {options.map((option) => {
          return (
            <Dropdown.Option key={option.id}
                option={option}
            >
              <Flex align="center">
                <Radio
                    checked={selectedValue === option.value}
                    name="dropdown_radio"
                    value={option.value}
                />
                <Body text={option.label} />
              </Flex>
            </Dropdown.Option>
          )
        })}
      </Dropdown>
  </div>
  )
}

export default  DropdownCustomRadioOptions
