import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Legend from './_legend'

test('returns namespaced class name', () => {
  render(
    <Legend
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_legend_kit_data_1')
})

test('color prop', () => {
  render(
    <Legend
        color="category_17"
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_legend_kit_category_17')
})
