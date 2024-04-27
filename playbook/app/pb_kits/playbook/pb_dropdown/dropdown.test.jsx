import React from "react"
import { render, screen } from "../utilities/test-utils"

import { Dropdown } from '../'


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

test('generated Trigger and Container when none passed in', () => {
  render(<DefaultDropdownKit/>)

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  const container = kit.querySelector('.pb_dropdown_container')
  expect(trigger).toBeInTheDocument()
  expect(container).toBeInTheDocument()
})

test('generated Options', () => {
  render(<DefaultDropdownKit/>)

  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option')
  expect(option).toBeInTheDocument()
})