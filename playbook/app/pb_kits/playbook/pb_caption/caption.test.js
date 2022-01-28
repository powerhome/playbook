import React from 'react'
import { render, screen } from '../utilities/test-utils'

import Caption from './_caption'

test('returns namespaced class name', () => {
  render(
    <Caption
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_caption_kit_md')
})

test('with colors', () => {
  render(
    <Caption
        color="success"
        data={{ testid: 'primary-test' }}
        text="Test colors"
    />
  )

  const kit = screen.getByTestId('primary-test')
  expect(kit).toHaveClass('pb_caption_kit_md_success')
})
