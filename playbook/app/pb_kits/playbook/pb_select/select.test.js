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
