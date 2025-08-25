import React from "react"
import { render, screen, userEvent, act } from "../utilities/test-utils"

import { Dropdown, Icon, IconCircle } from 'playbook-ui'


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
  expect(kit).toHaveClass('pb_dropdown_default')
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
  const customDisplay = trigger.querySelector('.pb_custom_icon')
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
          <Icon icon="flag" />
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
  const customTrigger = trigger.querySelector('.pb_custom_icon')
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
  act(() => {
    option.click()
  })
  expect(option).toHaveClass('pb_dropdown_option_selected')
})

test('show error message', () => {
  const errorMessage = 'Please make a valid selection'

  render (
    <Dropdown
        data={{ testid: testId }}
        error={errorMessage}
        options={options}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveTextContent(errorMessage)
})

test("autocomplete prop to render input", () => {
  render (
    <Dropdown
        autocomplete
        data={{ testid: testId }}
        options={options}
    />   
  )

  const kit = screen.getByTestId(testId)
  const input = kit.querySelector('.dropdown_input')
  expect(input).toBeInTheDocument()
})

test("searchbar prop to render TextInput in container", () => {  
  render (
    <Dropdown
        data={{ testid: testId }}
        options={options}
    >
      <Dropdown.Trigger>
          <IconCircle
              cursor="pointer"
              icon="flag"
              variant="royal"
          />
      </Dropdown.Trigger>
      <Dropdown.Container maxWidth="xs"
          searchbar
      >
      {options.map((option) => (
      <Dropdown.Option key={option.id} 
          option={option}
      /> 
    ))}
    </Dropdown.Container>
    </Dropdown>
  )

  const kit = screen.getByTestId(testId)
  const searchbar = kit.querySelector('.pb_text_input_kit')
  expect(searchbar).toBeInTheDocument()
})

test("MultiSelect prop to allow multiple selections + add correct Form Pills", () => {
  render(
    <Dropdown 
        data={{ testid: testId }} 
        multiSelect 
        options={options} 
    />
 );

  const kit = screen.getByTestId(testId);
  const option = Array.from(kit.querySelectorAll(".pb_dropdown_option_list"));
  userEvent.click(option[0]); // Select first option
  userEvent.click(option[1]); // Select second option
  const formPills = kit.querySelectorAll(".pb_form_pill_kit_primary");
  expect(formPills.length).toBe(2);
  expect(formPills[0]).toHaveTextContent("United States");
  expect(formPills[1]).toHaveTextContent("Canada");
});

 test("hides each selected option from the dropdown", async () => {
jest.setTimeout(10000)
    render(
      <Dropdown 
          data={{ testid: testId }} 
          multiSelect 
          options={options} 
      />
    );

  const kit = screen.getByTestId(testId);
  const option = Array.from(kit.querySelectorAll(".pb_dropdown_option_list"));
  const firstOpt = options[0].label
  await userEvent.click(option[0]);
  const option2 = Array.from(kit.querySelectorAll(".pb_dropdown_option_list"));
  expect(option2[0]).not.toHaveTextContent(firstOpt)
  })

test("renders form pills inside trigger", async () => {
jest.setTimeout(10000)
      render(
        <Dropdown 
            data={{ testid: testId }} 
            multiSelect 
            options={options} 
        />
      );

  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  await userEvent.click(option)
  const formPill = kit.querySelector(".pb_form_pill_kit_primary")
  expect(formPill).toBeInTheDocument()
  })

test("multiSelect and autocomplete to work together", async () => {
jest.setTimeout(10000)
  render (
    <Dropdown
        autocomplete
        data={{ testid: testId }}
        multiSelect
        options={options}
    />   
  )

  const kit = screen.getByTestId(testId)
  const input = kit.querySelector('.dropdown_input')
  expect(input).toBeInTheDocument()
  const option = kit.querySelector('.pb_dropdown_option_list')
  await userEvent.click(option)
  const formPill = kit.querySelector(".pb_form_pill_kit_primary")
  expect(formPill).toBeInTheDocument()
})

test("renders form pills with size and color", async () => {
jest.setTimeout(10000)
      render(
        <Dropdown 
            data={{ testid: testId }} 
            formPillProps={{ size: "small", color: "neutral" }}
            multiSelect 
            options={options} 
        />
      );

  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  await userEvent.click(option)
  const formPill = kit.querySelector(".pb_form_pill_kit_neutral")
  expect(formPill).toBeInTheDocument()
  expect(formPill).toHaveClass("small")
  })

test("defaultValue works with multiSelect", () => {
    render(
      <Dropdown
          data={{ testid: testId }}
          defaultValue={[options[0], options[2]]}
          multiSelect
          options={options}
      />
    )
    const kit = screen.getByTestId(testId)
    expect(kit.querySelectorAll(".pb_form_pill_kit_primary")).toHaveLength(2)
    const option2 = Array.from(kit.querySelectorAll(".pb_dropdown_option_list"));
    const firstOpt = options[0].label
    expect(option2[0]).not.toHaveTextContent(firstOpt)
  })

test("applies activeStyle backgroundColor and fontColor when selected", async () => {
jest.setTimeout(10000)
    render(
      <Dropdown
          activeStyle={{
            backgroundColor: "bg_light",
            fontColor: "primary",
          }}
          data={{ testid: testId }}
          options={options}
      />
    )
  
    const kit = screen.getByTestId(testId)
    const option = kit.querySelectorAll(".pb_dropdown_option_list")[1]
  
    await userEvent.click(option)
  
    const selected = kit.querySelector(".pb_dropdown_option_selected")

    expect(selected).toBeInTheDocument()
    expect(selected).toHaveClass("bg-bg_light")
    expect(selected).toHaveClass("font-primary")
  })