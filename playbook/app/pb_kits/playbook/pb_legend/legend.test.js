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

test('with status colors', () => {
  render(
    <Legend
        color="success"
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_legend_kit_success')
})
