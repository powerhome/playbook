import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Select from './_select'

const testId = 'select1',
  kitClass = 'pb_select'

const options = [
  {
    value: '1',
    text: 'Burgers',
  },
  {
    value: '2',
    text: 'Pizza',
  },
  {
    value: '3',
    text: 'Tacos',
  },
]

test('returns namespaced class name', () => {
  render(
    <Select
        data={{ testid: testId }}
        label="Favorite Food"
        name="food"
        options={options}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(kitClass)
})

test('returns dark class name', () => {
  render(
    <Select
        dark
        data={{ testid: testId }}
        label="Favorite Food"
        name="food"
        options={options}
    />
  )

  const kit = screen.getByTestId(testId)
  expect(kit).toHaveClass(`${kitClass} dark`)
})

test('returns multiple variant', () => {
  render(
    <Select
        data={{ testid: "selectMultiple" }}
        label="Favorite Food"
        multiple
        name="food"
        options={options}
    />
  )

  const kit = screen.getByTestId("selectMultiple");
  const selectElement = kit.querySelector('select');

  expect(selectElement).toHaveAttribute('multiple', '');
});

test('inputOptions are passed to select element', () => {
  render(
    <Select
        data={{ testid: testId }}
        inputOptions={{
          id: 'custom-select-id',
          className: 'custom-select-class',
          'aria-label': 'Custom aria label',
        }}
        label="Favorite Food"
        name="food"
        options={options}
    />
  )

  const kit = screen.getByTestId(testId)
  const selectElement = kit.querySelector('select')

  expect(selectElement).toHaveAttribute('id', 'custom-select-id')
  expect(selectElement).toHaveClass('custom-select-class')
  expect(selectElement).toHaveAttribute('aria-label', 'Custom aria label')
});