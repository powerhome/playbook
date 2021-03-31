import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Checkbox from './_checkbox'

const testId = 'checkbox1',
  kitClass = 'pb_checkbox_kit'

test('returns namespaced class name', () => {
  render(
    <Checkbox
        data={{ testid: testId }}
        name="checkbox-name"
        text="Checkbox"
        value="check-box value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns dark class name', () => {
  render(
    <Checkbox
        dark
        data={{ testid: testId }}
        name="checkbox-name"
        text="Checkbox"
        value="check-box value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

test('returns indeterminate class name', () => {
  render(
    <Checkbox
        data={{ testid: testId }}
        indeterminate
        name="checkbox-name"
        text="Checkbox"
        value="check-box value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass}_indeterminate`)
})

test('has name attribute', () => {
  render(
    <Checkbox
        data={{ testid: testId }}
        name="checkbox-name"
        text="Checkbox"
        value="check-box value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.getElementsByTagName('input')[0]).toHaveAttribute('name', 'checkbox-name')
})

test('has value attribute', () => {
  render(
    <Checkbox
        data={{ testid: testId }}
        name="checkbox-name"
        text="Checkbox"
        value="checkbox value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.getElementsByTagName('input')[0]).toHaveAttribute('value', 'checkbox value')
})

test('has checked attribute', () => {
  render(
    <Checkbox
        checked
        data={{ testid: testId }}
        name="checkbox-name"
        text="Checkbox"
        value="check-box value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.getElementsByTagName('input')[0]).toHaveAttribute('checked')
})
