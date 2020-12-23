import React from 'react'
import { render, screen } from '../utilities/test-utils'

import TextInput from './_text_input'

const testId = 'text-input1',
  kitClass = 'pb_text_input_kit'

test('returns namespaced class name', () => {
  render(
    <TextInput
        data={{ testid: testId }}
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns additional class name', () => {
  render(
    <TextInput
        className="additional_class"
        data={{ testid: testId }}
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} additional_class`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        dark
        data={{ testid: testId }}
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        data={{ testid: testId }}
        error="Please enter a valid email"
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} error`)
})

test('returns additional class name', () => {
  render(
    <TextInput
        dark
        data={{ testid: testId }}
        error="Please enter a valid email"
        label="First Name"
        placeholder="Enter first name"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark error`)
})
