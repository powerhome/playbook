import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Title from './_title'

test('returns namespaced class name', () => {
  render(
    <Title
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_title_kit_size_3')
})

test('with colors', () => {
  render(
    <Title
        color="success"
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_title_kit_size_3_success')
})
