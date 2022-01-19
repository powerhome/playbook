import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Body from './_body'

test('returns namespaced class name', () => {
  render(
    <Body
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_body_kit')
})

test('with colors', () => {
  render(
    <Body
        color="success"
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_body_kit_success')
})
