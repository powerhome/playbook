import React, { useState } from "react"
import { render, screen, fireEvent } from "../utilities/test-utils"

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

test('placeholder prop passed directly to Dropdown', () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        options={options}
        placeholder="Choose a country"
    />
  )

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toHaveTextContent('Choose a country')
})

test('placeholder works with default variant', () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        options={options}
        placeholder="Select an option"
        variant="default"
    />
  )

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toHaveTextContent('Select an option')
})

test('placeholder works with subtle variant', () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        options={options}
        placeholder="Pick an option"
        separators={false}
        variant="subtle"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_dropdown_subtle_separators_hidden')
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toHaveTextContent('Pick an option')
})

test('placeholder works with quickpick variant', () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        placeholder="Select a date range"
        variant="quickpick"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_dropdown_quickpick')
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toHaveTextContent('Select a date range')
})

test('placeholder shows default "Select..." when not provided', () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        options={options}
    />
  )

  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  expect(trigger).toHaveTextContent('Select...')
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
  option.click()
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
  fireEvent.click(option[0]); // Select first option
  fireEvent.click(option[1]); // Select second option
  const formPills = kit.querySelectorAll(".pb_form_pill_kit.pb_form_pill_primary");
  expect(formPills.length).toBe(2);
  expect(formPills[0]).toHaveTextContent("United States");
  expect(formPills[1]).toHaveTextContent("Canada");
});

 test("hides each selected option from the dropdown", () => {

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
  fireEvent.click(option[0]);
  const option2 = Array.from(kit.querySelectorAll(".pb_dropdown_option_list"));
  expect(option2[0]).not.toHaveTextContent(firstOpt)
  })

test("renders form pills inside trigger", () => {
      render(
        <Dropdown 
            data={{ testid: testId }} 
            multiSelect 
            options={options} 
        />
      );

  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  fireEvent.click(option)
  const formPill = kit.querySelector(".pb_form_pill_kit.pb_form_pill_primary")
  expect(formPill).toBeInTheDocument()
  })

test("multiSelect and autocomplete to work together", () => {
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
  fireEvent.click(option)
  const formPill = kit.querySelector(".pb_form_pill_kit.pb_form_pill_primary")
  expect(formPill).toBeInTheDocument()
})

test("renders form pills with size and color", () => {
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
  fireEvent.click(option)
  const formPill = kit.querySelector(".pb_form_pill_kit.pb_form_pill_neutral")
  expect(formPill).toBeInTheDocument()
  expect(formPill).toHaveClass("pb_form_pill_small")
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
    expect(kit.querySelectorAll(".pb_form_pill_kit.pb_form_pill_primary")).toHaveLength(2)
    const option2 = Array.from(kit.querySelectorAll(".pb_dropdown_option_list"));
    const firstOpt = options[0].label
    expect(option2[0]).not.toHaveTextContent(firstOpt)
  })

test("applies activeStyle backgroundColor and fontColor when selected", () => {
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
  
    fireEvent.click(option)
  
    const selected = kit.querySelector(".pb_dropdown_option_selected")

    expect(selected).toBeInTheDocument()
    expect(selected).toHaveClass("bg-bg_light")
    expect(selected).toHaveClass("font-primary")
  })

test("renders quickpick variant with auto-generated options", () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass('pb_dropdown_quickpick')
  
  // Check that quickpick options are generated
  const options = kit.querySelectorAll('.pb_dropdown_option_list')
  expect(options.length).toBe(10)
  expect(options[0]).toHaveTextContent("Today")
})

test("quickpick variant accepts string defaultValue", () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        defaultValue="This Month"
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  
  expect(trigger).toHaveTextContent("This Month")
})

test("quickpick attaches _dropdownRef to DOM element when id is provided", () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        id="test-quickpick"
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  
  // Check that the element has the _dropdownRef attached
  expect(kit._dropdownRef).toBeDefined()
  expect(kit._dropdownRef.current).toBeDefined()
  expect(kit._dropdownRef.current.clearSelected).toBeDefined()
})

test("quickpick clears selection when clicking X icon", () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        defaultValue="This Week"
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  
  expect(trigger).toHaveTextContent("This Week")
  
  const clearIcon = kit.querySelector('[aria-label="times icon"]')
  expect(clearIcon).toBeInTheDocument()
  
  fireEvent.click(clearIcon.parentElement)
  
  expect(trigger).toHaveTextContent("Select...")
})

test("quickpick hides clear icon when clearable is false", () => {
  render(
    <Dropdown
        clearable={false}
        data={{ testid: testId }}
        defaultValue="This Week"
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const trigger = kit.querySelector('.pb_dropdown_trigger')
  
  expect(trigger).toHaveTextContent("This Week")
  
  const clearIcon = kit.querySelector('[aria-label="times icon"]')
  expect(clearIcon).not.toBeInTheDocument()
})

test("quickpick returns date array values when option selected", () => {
  // eslint-disable-next-line react/no-multi-comp
  const TestComponent = () => {
    const [selected, setSelected] = useState(null)
    return (
      <>
        <Dropdown
            data={{ testid: testId }}
            onSelect={(item) => setSelected(item)}
            variant="quickpick"
        />
        {selected && (
          <div data-testid="selected-value">
            {JSON.stringify({
              label: selected.label,
              hasValue: !!selected.value,
              isArray: Array.isArray(selected.value),
              valueLength: selected.value?.length
            })}
          </div>
        )}
      </>
    )
  }

  render(<TestComponent />)
  
  const kit = screen.getByTestId(testId)
  const options = kit.querySelectorAll('.pb_dropdown_option_list')
  
  fireEvent.click(options[0])
  
  const selectedValue = screen.getByTestId('selected-value')
  const data = JSON.parse(selectedValue.textContent)
  
  expect(data.label).toBe("Today")
  expect(data.hasValue).toBe(true)
  expect(data.isArray).toBe(true)
  expect(data.valueLength).toBe(2)
})

test("quickpick option values are Date objects", () => {
  const onSelectMock = jest.fn()
  
  render(
    <Dropdown
        data={{ testid: testId }}
        onSelect={onSelectMock}
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const options = kit.querySelectorAll('.pb_dropdown_option_list')
  
  const thisMonthOption = Array.from(options).find(opt => opt.textContent === 'This Month')
  fireEvent.click(thisMonthOption)
  
  const selectedItem = onSelectMock.mock.calls[0][0]
  
  expect(selectedItem.label).toBe("This Month")
  expect(selectedItem.value).toBeDefined()
  expect(Array.isArray(selectedItem.value)).toBe(true)
  expect(selectedItem.value.length).toBe(2)
  
  const [startDate, endDate] = selectedItem.value
  
  expect(startDate instanceof Date).toBe(true)
  expect(endDate instanceof Date).toBe(true)
  
  expect(startDate.getTime()).not.toBeNaN()
  expect(endDate.getTime()).not.toBeNaN()
  
  expect(endDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime())
})

test("customQuickPickDates overrides default options when override is true or undefined", () => {
  render(
    <Dropdown
        customQuickPickDates={{
          dates: [
            {
              label: "Last 15 months",
              value: { timePeriod: "months", amount: 15 }
            },
            {
              label: "Custom Range",
              value: ["06/01/2022", "06/07/2022"]
            }
          ]
        }}
        data={{ testid: testId }}
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const options = kit.querySelectorAll('.pb_dropdown_option_list')
  
  expect(options.length).toBe(2)
  expect(options[0]).toHaveTextContent("Last 15 months")
  expect(options[1]).toHaveTextContent("Custom Range")
})

test("customQuickPickDates appends to defaults when override is false", () => {
  render(
    <Dropdown
        customQuickPickDates={{
          override: false,
          dates: [
            {
              label: "Custom Option",
              value: { timePeriod: "days", amount: 30 }
            }
          ]
        }}
        data={{ testid: testId }}
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const options = kit.querySelectorAll('.pb_dropdown_option_list')
  
  expect(options.length).toBe(11)
  expect(options[0]).toHaveTextContent("Today")
  expect(options[10]).toHaveTextContent("Custom Option")
})

test("customQuickPickDates with explicit date array returns correct values", () => {
  const onSelectMock = jest.fn()
  
  render(
    <Dropdown
        customQuickPickDates={{
          dates: [
            {
              label: "First Week of June 2022",
              value: ["06/01/2022", "06/07/2022"]
            }
          ]
        }}
        data={{ testid: testId }}
        onSelect={onSelectMock}
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  
  fireEvent.click(option)
  
  const selectedItem = onSelectMock.mock.calls[0][0]
  
  expect(selectedItem.label).toBe("First Week of June 2022")
  expect(Array.isArray(selectedItem.value)).toBe(true)
  expect(selectedItem.value.length).toBe(2)
})

test("customQuickPickDates with timePeriod calculates dates correctly", () => {
  const onSelectMock = jest.fn()
  
  render(
    <Dropdown
        customQuickPickDates={{
          dates: [
            {
              label: "Last 7 days",
              value: { timePeriod: "days", amount: 7 }
            }
          ]
        }}
        data={{ testid: testId }}
        onSelect={onSelectMock}
        variant="quickpick"
    />
  )
  
  const kit = screen.getByTestId(testId)
  const option = kit.querySelector('.pb_dropdown_option_list')
  
  fireEvent.click(option)
  
  const selectedItem = onSelectMock.mock.calls[0][0]
  
  expect(selectedItem.label).toBe("Last 7 days")
  expect(Array.isArray(selectedItem.value)).toBe(true)
  
  const [startDate, endDate] = selectedItem.value
  expect(startDate instanceof Date).toBe(true)
  expect(endDate instanceof Date).toBe(true)
  
  const today = new Date()
  expect(endDate.toDateString()).toBe(today.toDateString())
})

test("requiredIndicator prop renders asterisk when true", () => {
  render(
    <Dropdown
        data={{ testid: testId }}
        label="Required Dropdown"
        options={options}
        requiredIndicator
    >
      {options.map((option) => (
        <Dropdown.Option key={option.id}
            option={option}
        />
      ))}
    </Dropdown>,
  );

  const kit = screen.getByTestId(testId);
  const label = screen.getByText("Required Dropdown");

  expect(label).toBeInTheDocument();
  expect(kit).toHaveTextContent("*");
});
