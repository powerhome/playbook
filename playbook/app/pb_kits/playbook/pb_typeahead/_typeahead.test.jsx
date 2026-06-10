import React from 'react'
import { render, screen, fireEvent, waitFor } from '../utilities/test-utils'
import Typeahead from './_typeahead'

const options = [
  { label: 'Orange', value: '#FFA500' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Green', value: '#00FF00' },
  { label: 'Blue', value: '#0000FF' },
]

test('typeahead classname + label renders as expected', () => {
  render(
    <Typeahead
        data={{ testid: 'typeahead-test' }}
        defaultValue={[options[0]]}
        label="Colors"
        options={options}
    />
  )

  const kit = screen.getByTestId('typeahead-test')
  const label = kit.querySelector(".pb_caption_kit_md_lighter.pb_text_input_kit_label")
  expect(kit).toHaveClass("pb_typeahead_kit")
  expect(label).toHaveTextContent("Colors")
})

test('to be error variant', () => {
  render(
    <Typeahead
        data={{ testid: 'error-test' }}
        error='Please make a valid selection'
        options={options}
    />
  )

  const kit = screen.getByTestId("error-test")
  const error = kit.querySelector(".pb_body_kit_negative")
  expect(error).toBeInTheDocument()
}) 

test('should be inline variant', () => {
  render(
    <Typeahead
        data={{ testid: 'inline-test' }}
        inline
        options={options}
    />
  )

  const kit = screen.getByTestId('inline-test')
  expect(kit).toHaveClass("inline")
})

test('typeahead with pills', () => {
  render(
    <Typeahead
        data={{ testid: 'pills-test' }}
        defaultValue={[options[0]]}
        isMulti
        options={options}
    />
  )

  const kit = screen.getByTestId('pills-test')
  const pill = kit.querySelector(".pb_form_pill_kit.pb_form_pill_primary")
  expect(pill).toBeInTheDocument()
})

test('typeahead multi select with badges and small pills', () => {
  render(
    <>
    <Typeahead
        data={{ testid: 'badge-test' }}
        defaultValue={[options[0]]}
        isMulti
        multiKit="badge"
        options={options}
    />

    <Typeahead
        data={{ testid: 'small-pill-test' }}
        defaultValue={[options[0]]}
        isMulti
        multiKit="smallPill"
        options={options}
    />
    </>
  )

  const kit = screen.getByTestId('small-pill-test')
  const badge = kit.querySelector(".pb_form_pill_kit.pb_form_pill_primary.mr_xs.pb_form_pill_small")
  expect(badge).toBeInTheDocument()
})

test('should pass className prop', () => {
  const className = 'custom-class-name'
  render(
    <Typeahead
        className={className}
        data={{ testid: 'typeahead-test' }}
        defaultValue={[options[0]]}
        label="Colors"
        options={options}
    />
  )

  const kit = screen.getByTestId('typeahead-test')
  expect(kit).toHaveClass(className)
})

test('typeahead textinput has mb_sm class by default', () => {
  render(
    <Typeahead
        data={{ testid: 'default-mb-test' }}
        options={options} 
    />
  )

  const kit = screen.getByTestId('default-mb-test')
  expect(kit).toHaveClass("pb_typeahead_kit mb_sm")
  const textInput = kit.querySelector(".pb_text_input_kit")
  expect(textInput).toHaveClass("mb_none")
})

test('typeahead with colored pills', () => {
  render(
    <Typeahead
        data={{ testid: 'pills-color-test' }}
        defaultValue={[options[0]]}
        isMulti
        options={options}
        pillColor="neutral"
    />
  )

  const kit = screen.getByTestId('pills-color-test')
  const pill = kit.querySelector(".pb_form_pill_kit.pb_form_pill_neutral")
  expect(pill).toBeInTheDocument()
})

test('typeahead with defaultValue with focus behavior', async () => {
  render(
    <Typeahead
        data={{ testid: 'default-value-focus-test' }}
        defaultValue={[options[1]]}
        options={options}
    />
  )

  const kit = screen.getByTestId('default-value-focus-test')
  const inputDiv = kit.querySelector(".typeahead-kit-select__single-value")
  expect(inputDiv).toHaveTextContent("Red")
  
  // Test that the control can receive focus
  const control = kit.querySelector('.typeahead-kit-select__control')
  expect(control).toBeInTheDocument()
  
  // Simulate opening the menu by clicking the control
  fireEvent.mouseDown(control)
  
  // Wait for menu to appear
  await waitFor(() => {
    const menu = kit.querySelector('.typeahead-kit-select__menu')
    expect(menu).toBeInTheDocument()
  })
  
  // Check that the correct option has the focused class
  await waitFor(() => {
    const focusedOption = kit.querySelector('.typeahead-kit-select__option--is-focused')
    expect(focusedOption).toBeInTheDocument()
    expect(focusedOption).toHaveTextContent('Red')
  })
})

test('typeahead with grouped options and defaultValue focus behavior', async () => {
  const groupedOptions = [
    {
      label: "Warm Colors",
      options: [
        { label: "Red", value: "#FF0000" },
        { label: "Orange", value: "#FFA500" },
        { label: "Yellow", value: "#FFFF00" }
      ]
    },
    {
      label: "Cool Colors",
      options: [
        { label: "Blue", value: "#0000FF" },
        { label: "Teal", value: "#008080" },
        { label: "Cyan", value: "#00FFFF" }
      ]
    },
    {
      label: "Fun Shades",
      options: [
        { label: "Pink", value: "#FFC0CB" },
        { label: "Magenta", value: "#FF00FF" },
        { label: "Purple", value: "#800080" }
      ]
    }
  ]

  render(
    <Typeahead
        data={{ testid: 'grouped-options-focus-test' }}
        defaultValue={[{ label: "Pink", value: "#FFC0CB" }]}
        options={groupedOptions}
    />
  )

  const kit = screen.getByTestId('grouped-options-focus-test')
  const inputDiv = kit.querySelector(".typeahead-kit-select__single-value")
  expect(inputDiv).toHaveTextContent("Pink")
})

test('multi-value pills have tabIndex for keyboard navigation', () => {
  render(
    <Typeahead
        data={{ testid: 'pill-tabindex-test' }}
        defaultValue={[options[0], options[1]]}
        isMulti
        options={options}
    />
  )

  const kit = screen.getByTestId('pill-tabindex-test')
  const pills = kit.querySelectorAll('.pb_form_pill_kit')
  
  expect(pills.length).toBe(2)
  
  pills.forEach(pill => {
    expect(pill).toHaveAttribute('tabIndex', '0')
  })
})

test('multi-value pills show focus indicator when focused', async () => {
  render(
    <Typeahead
        data={{ testid: 'pill-focus-indicator-test' }}
        defaultValue={[options[0], options[1], options[2]]}
        isMulti
        options={options}
    />
  )

  const kit = screen.getByTestId('pill-focus-indicator-test')
  const pills = kit.querySelectorAll('.pb_form_pill_kit')
  
  expect(pills.length).toBe(3)
  
  const firstPill = pills[0]
  firstPill.focus()
  
  expect(document.activeElement).toBe(firstPill)
})

test('multi-value badges have tabIndex and focus class when focused', () => {
  render(
    <Typeahead
        data={{ testid: 'badge-focus-test' }}
        defaultValue={[options[0], options[1]]}
        isMulti
        multiKit="badge"
        options={options}
    />
  )

  const kit = screen.getByTestId('badge-focus-test')
  const badges = kit.querySelectorAll('.pb_badge_kit_primary')
  
  expect(badges.length).toBe(2)

  badges.forEach(badge => {
    expect(badge).toHaveAttribute('tabIndex', '0')
  })
})

test('input display none shows number of selected items', () => {
  render(
    <Typeahead
        data={{ testid: 'input-display-none-test' }}
        defaultValue={[options[0], options[1]]}
        inputDisplay="none"
        isMulti
        options={options}
    />
  )

  const kit = screen.getByTestId('input-display-none-test')
  const inputDisplayDiv = kit.querySelector(".pb_typeahead_selection_count")
  expect(inputDisplayDiv).toHaveTextContent("2 items selected")
})

test('input display none keeps selected options visible in dropdown with selected styling', async () => {
  render(
    <Typeahead
        data={{ testid: 'input-display-none-dropdown-test' }}
        defaultValue={[options[0], options[1]]}
        inputDisplay="none"
        isMulti
        options={options}
    />
  )

  const kit = screen.getByTestId('input-display-none-dropdown-test')
  const control = kit.querySelector('.typeahead-kit-select__control')
  fireEvent.mouseDown(control)

  await waitFor(() => {
    const menu = kit.querySelector('.typeahead-kit-select__menu')
    expect(menu).toBeInTheDocument()
  })

  // Selected options (Orange, Red) should remain in the dropdown and be marked as selected
  const selectedOptions = kit.querySelectorAll('.typeahead-kit-select__option--is-selected')
  expect(selectedOptions.length).toBe(2)
  const labels = Array.from(selectedOptions).map((el) => el.textContent)
  expect(labels).toContain('Orange')
  expect(labels).toContain('Red')
})

test('typeahead with pills that use name instead of label', () => {
  const customOptions = [
    { name: 'Nihar', value: '1' },
    { name: 'kylehgousel', value: '2' },
  ]

  render(
    <Typeahead
        data={{ testid: 'pills-custom-fields-test' }}
        defaultValue={[{ name: 'Nihar', value: '1' }]}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.value}
        isMulti
        options={customOptions}
    />
  )

  const kit = screen.getByTestId('pills-custom-fields-test')
  const pill = kit.querySelector(".pb_form_pill_kit.pb_form_pill_primary")
  expect(pill).toBeInTheDocument()
  expect(pill).toHaveTextContent("Nihar")
})

test('enablePillReorder false does not render drag handles', () => {
  render(
    <Typeahead
        data={{ testid: 'no-reorder-test' }}
        defaultValue={[options[0], options[1]]}
        enablePillReorder={false}
        isMulti
        options={options}
    />
  )

  const kit = screen.getByTestId('no-reorder-test')
  expect(kit.querySelector('.pb_typeahead_pill_drag_handle')).not.toBeInTheDocument()
})

test('enablePillReorder renders drag handles and numbered pills', () => {
  render(
    <Typeahead
        data={{ testid: 'reorder-test' }}
        defaultValue={[options[0], options[1], options[2]]}
        enablePillReorder
        isMulti
        options={options}
        showPillIndex
    />
  )

  const kit = screen.getByTestId('reorder-test')
  const handles = kit.querySelectorAll('.pb_typeahead_pill_drag_handle')
  const pills = kit.querySelectorAll('.pb_form_pill_kit.pb_form_pill_primary')

  expect(handles.length).toBe(3)
  expect(pills.length).toBe(3)
  expect(pills[0]).toHaveTextContent('1. Orange')
  expect(pills[1]).toHaveTextContent('2. Red')
  expect(pills[2]).toHaveTextContent('3. Green')
})

test('keyboard reorder moves pill position when enablePillReorder is true', () => {
  const handleChange = jest.fn()

  render(
    <Typeahead
        data={{ testid: 'keyboard-reorder-test' }}
        enablePillReorder
        isMulti
        onChange={handleChange}
        options={options}
        showPillIndex
        value={[options[0], options[1], options[2]]}
    />
  )

  const kit = screen.getByTestId('keyboard-reorder-test')
  const pills = kit.querySelectorAll('.pb_form_pill_kit.pb_form_pill_primary')

  pills[1].focus()
  fireEvent.keyDown(pills[1], { key: 'ArrowLeft', ctrlKey: true, shiftKey: true })

  expect(handleChange).toHaveBeenCalled()
  const reorderedValue = handleChange.mock.calls[0][0]
  expect(reorderedValue[0].label).toBe('Red')
  expect(reorderedValue[1].label).toBe('Orange')
})

test('remove still works when enablePillReorder is true', () => {
  const handleChange = jest.fn()

  render(
    <Typeahead
        data={{ testid: 'remove-reorder-test' }}
        enablePillReorder
        isMulti
        onChange={handleChange}
        options={options}
        value={[options[0], options[1]]}
    />
  )

  const kit = screen.getByTestId('remove-reorder-test')
  const removeButton = kit.querySelector('.pb_form_pill_close')

  fireEvent.click(removeButton)

  expect(handleChange).toHaveBeenCalled()
  const updatedValue = handleChange.mock.calls[0][0]
  expect(updatedValue.length).toBe(1)
})

test('pillDragHandle false hides grip and enables whole-pill pointer drag', () => {
  render(
    <Typeahead
        data={{ testid: 'no-handle-reorder-test' }}
        enablePillReorder
        isMulti
        options={options}
        pillDragHandle={false}
        value={[options[0], options[1], options[2]]}
    />
  )

  const kit = screen.getByTestId('no-handle-reorder-test')
  expect(kit.querySelector('.pb_typeahead_pill_drag_handle')).not.toBeInTheDocument()

  const draggableItems = kit.querySelectorAll('.pb_draggable_item')
  draggableItems.forEach((item) => {
    expect(item.getAttribute('draggable')).toBe('false')
  })
})

test('pill reorder commit dispatches custom event on drop', () => {
  const reorderHandler = jest.fn()

  render(
    <Typeahead
        data={{ testid: 'reorder-event-test' }}
        enablePillReorder
        id="reorder-event-typeahead"
        isMulti
        options={options}
        value={[options[0], options[1], options[2]]}
    />
  )

  document.addEventListener(
    'pb-typeahead-kit-reorder-event-typeahead-result-option-reorder',
    reorderHandler,
  )

  const kit = screen.getByTestId('reorder-event-test')
  const draggableItems = kit.querySelectorAll('.pb_draggable_item')

  fireEvent.dragStart(draggableItems[2])
  fireEvent.dragEnter(draggableItems[0])
  fireEvent.dragEnd(draggableItems[2])

  expect(reorderHandler).toHaveBeenCalled()

  document.removeEventListener(
    'pb-typeahead-kit-reorder-event-typeahead-result-option-reorder',
    reorderHandler,
  )
})
