import React from "react"
import { render, screen } from "../utilities/test-utils"

import { Dropdown, Icon } from '../'


const testId = 'dropdown'

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

const DefaultDropdownKit = () => {
  return (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
    {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown>
  )
}

test('generated default kit and classname', () => {
  render(<DefaultDropdownKit/>)

  const kit = screen.getByTestId(testId)
  expect(kit).toBeInTheDocument()
  expect(kit).toHaveClass('pb_dropdown')
})

test('generated default Trigger and Container when none passed in', () => {
  render(<DefaultDropdownKit/>)

  const kit = screen.getByTestId(testId)

  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toBeInTheDocument()

  const container = kit.querySelector('.pb_dropdown_container')
  expect(container).toBeInTheDocument()

  const defaultTrigger = kit.querySelector('.dropdown_trigger_wrapper_select_only')
  expect(defaultTrigger).toBeInTheDocument()
})

test('generated Options', () => {
  render(<DefaultDropdownKit/>)

  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  expect(option).toBeInTheDocument()
})

test('generated customDisplay for trigger', () => {  
  render (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
      <Dropdown.Trigger 
          customDisplay={<Icon icon="flag" />}
      />
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  const customDisplay = trigger.querySelector('.fa-flag.pb_icon_kit.fa-fw')
  expect(customDisplay).toBeInTheDocument()
})

test('generated placeholder prop', () => { 
  render (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
      <Dropdown.Trigger 
          placeholder="Select a country"
      />
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toHaveTextContent('Select a country')

})

test('generated label prop', () => { 
  render (
    <Dropdown
        data={{ testid: testId }}
        label="Countries"
        options={options}
    >
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const label = kit.querySelector('.pb_caption_kit_md')
  expect(label).toHaveTextContent('Countries')
})

test('generated custom option', () => {
  render (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      >
         <Icon icon={option.icon} />
      </Dropdown.Option>
    ))}
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const customOption = kit.querySelector('.pb_icon_kit_emoji')
  expect(customOption).toBeInTheDocument()
})

test('generated custom Trigger', () => {
  render (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
      <Dropdown.Trigger>
          <Icon icon="elephant" />
      </Dropdown.Trigger>
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  const customTrigger = trigger.querySelector('.fa-elephant.pb_icon_kit.fa-fw')
  expect(customTrigger).toBeInTheDocument()
})

test('selected option on click', () => {  
  render (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  option.click()
  expect(option).toHaveClass('pb_dropdown_option_selected')
})