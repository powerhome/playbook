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
        checked
        data={{ testid: testId }}
        indeterminate
        name="checkbox-name"
        text="Checkbox"
        value="check-box value"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass}_checked_indeterminate`)
})
