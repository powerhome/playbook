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
  const label = kit.querySelector(".pb_caption_kit_md.pb_text_input_kit_label")
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