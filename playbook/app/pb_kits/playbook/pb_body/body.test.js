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
  ['light', 'lighter', 'link', 'success', 'error'].forEach((color) => {
    const testId = `colors-test-${color}`
    render(
      <Body
          color={color}
          data={{ testid: testId }}
          text="Test colors"
      />
    )

    const kit = screen.getByTestId(testId)
    expect(kit).toHaveClass(`pb_body_kit_${color}`)
  })
})
