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

test('prefixText prop renders', () => {
  render(
    <Legend
        color="category_17"
        data={{ testid: 'primary-test' }}
        prefixText="10"
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  const prefix = kit.querySelector(".pb_title_kit.pb_title_4")
  expect(prefix).toBeInTheDocument()
})

test('Color prop renders with custom HEX value', () => {
  render(
    <Legend
        color="#dc418a"
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  const circle = kit.querySelector(".pb_legend_indicator_circle_custom")
  expect(circle).toHaveStyle('background: rgb(220, 65, 138);')
})
