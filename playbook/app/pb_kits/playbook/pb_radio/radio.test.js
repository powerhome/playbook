import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Radio from './_radio'

const testId = 'radio1',
  kitClass = 'pb_radio_kit'

test('returns namespaced class name', () => {
  render(
    <Radio
        data={{ testid: testId }}
        defaultChecked
        label="Power"
        name="Group2"
        value="Power"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns dark class name', () => {
  render(
    <Radio
        dark
        data={{ testid: testId }}
        defaultChecked
        label="Power"
        name="Group2"
        value="Power"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

test('returns error class name', () => {
  render(
    <Radio
        data={{ testid: testId }}
        defaultChecked
        error
        label="Power"
        name="Group2"
        value="Power"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} error`)
})

test('returns dark + error class name', () => {
  render(
    <Radio
        dark
        data={{ testid: testId }}
        defaultChecked
        error
        label="Power"
        name="Group2"
        value="Power"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark error`)
})
