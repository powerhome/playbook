import React from 'react'
import { render, screen } from '../utilities/test-utils'
import { Passphrase } from '../'

const testId = 'text-input1',
  kitClass = 'pb_passphrase'

/* See these resources for more testing info:
  - https://github.com/testing-library/jest-dom#usage for useage and examples
  - https://jestjs.io/docs/en/using-matchers
*/

test('returns namespaced class name', () => {
  render(
    <Passphrase
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns additional class name', () => {
  render(
    <Passphrase
        className="additional_class"
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} additional_class`)
})

test('returns dark class name', () => {
  render(
    <Passphrase
        dark
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

test('passes input props to input element', () => {
  render(
    <Passphrase
        data={{ testid: testId }}
        inputProps={{
          name: 'test-name',
          id: 'test-input-id',
          disabled: true,
        }}
    />
  )

  const kit = screen.getByTestId(testId)
  const input = kit.getElementsByTagName('input')[0]
  expect(input).toHaveAttribute('name', 'test-name')
  expect(input).toHaveAttribute('id', 'test-input-id')
  expect(input).toBeDisabled()
})

test('progress bar is invisible when value is empty', () => {
  render(
    <Passphrase
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.querySelector('[class^=pb_progress_simple_wrapper]')).toHaveClass('progress-empty-input')
})

test('progress bar is visible when value is not empty', () => {
  render(
    <Passphrase
        data={{ testid: testId }}
        value="test_password_input"
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.querySelector('[class^=pb_progress_simple_wrapper]')).not.toHaveClass('progress-empty-input')
})

test('no progress bar is show when confirmation is true', () => {
  render(
    <Passphrase
        confirmation
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.querySelector('[class^=pb_progress_simple_wrapper]')).toBeNull()
})

test('popover target shows when tips are given', () => {
  render(
    <Passphrase
        data={{ testid: testId }}
        tips={['some helpful tips']}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.querySelector('[class^=pb_popover_reference_wrapper]')).toBeDefined()
})

test('popover target does not show when tips are not given', () => {
  render(
    <Passphrase
        data={{ testid: testId }}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit.querySelector('[class^=pb_popover_reference_wrapper]')).toBeNull()
})
